import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { promisify } from "util";
import { writeFile } from "fs";
import axios from "axios";
import { ALIAS, VERSION_SC } from "./konst.js";

const writeFileAsync = promisify(writeFile);

const getOrdinalSuffix = (number) => {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return number + "st";
  }
  if (lastDigit === 2 && lastTwoDigits !== 12) {
    return number + "nd";
  }
  if (lastDigit === 3 && lastTwoDigits !== 13) {
    return number + "rd";
  }
  return number + "th";
};

const convertTimestamp = (timestamp) => {
  if (timestamp < 1) {
    timestamp = 0;
  }
  const hours = Math.floor(timestamp / 3600);
  const minutes = Math.floor((timestamp % 3600) / 60);
  const seconds = timestamp % 60;
  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");
  return (
    "" +
    chalk.magentaBright("[") +
    chalk.whiteBright(hoursStr) +
    chalk.blackBright(":") +
    chalk.whiteBright(minutesStr) +
    chalk.blackBright(":") +
    chalk.whiteBright(secondsStr) +
    chalk.magentaBright("]")
  );
};

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return (
    "" +
    chalk.magentaBright("[") +
    chalk.whiteBright(hours) +
    chalk.blackBright(":") +
    chalk.whiteBright(minutes) +
    chalk.blackBright(":") +
    chalk.whiteBright(seconds) +
    chalk.magentaBright("]")
  );
};

const formatNumber = (number) => {
  const suffixes = ["", "K", "M", "B", "T", "Q"];
  if (number < 1000) {
    return number.toString();
  }
  let suffixIndex = -1;
  let value = number;
  while (value >= 1000) {
    value /= 1000;
    suffixIndex++;
  }
  if (suffixIndex >= suffixes.length) {
    const overSuffixIndex = suffixIndex - suffixes.length;
    const firstLetter = "abcdefghijklmnopqrstuvwxyz"[
      Math.floor(overSuffixIndex / "abcdefghijklmnopqrstuvwxyz".length)
    ];
    const secondLetter = "abcdefghijklmnopqrstuvwxyz"[
      overSuffixIndex % "abcdefghijklmnopqrstuvwxyz".length
    ];
    return "" + value.toFixed(3) + firstLetter + secondLetter;
  }
  return "" + value.toFixed(3) + suffixes[suffixIndex];
};

// Mendapatkan direktori dari URL file saat ini
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fungsi untuk mendapatkan direktori session, sekarang mengarah ke desktop
const getSessionDirectory = (directoryName) => {
  // Menggunakan __dirname untuk mendapatkan direktori tempat script berada
  const baseDir = path.resolve(__dirname, "../.."); // naik dua level ke folder 'catizen-bot (SFILE.MOBI)'
  const sessionDir = path.join(baseDir, directoryName);
  return sessionDir;
};

const createSessionDirectory = (folderName) => {
  const sessionDirectory = getSessionDirectory(folderName);
  if (!fs.existsSync(sessionDirectory)) {
    fs.mkdirSync(sessionDirectory, {
      recursive: true,
    });
  }
};

const runtimeServer = async () => {
  try {
    const response = await axios.post("https://tuyulgaple.my.id/adidoank/", {
      sk: ALIAS,
      vr: VERSION_SC,
    });
    if (response.data.status) {
      return {
        status: "connect",
        baner: response.data.baner,
      };
    } else if (response.data === "") {
      return {
        status: "reconnecting",
        baner: baner(),
      };
    } else {
      return {
        status: "exit",
        baner: baner(),
      };
    }
  } catch (error) {
    return {
      status: "reconnecting",
      baner: baner(),
    };
  }
};

const baner = () => {
  const bannerText =
    "\n" +
    chalk.white("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~") +
    "\n" +
    chalk.blueBright("╔══╗ ╔╦╗ ╔═╦╗ ╔╦╗ ╔╗─ ╔══╗ ╔══╗ ╔═╗ ╔╗─ ╔═╗") +
    "\n" +
    chalk.blueBright("╚╗╔╝ ║║║ ╚╗║║ ║║║ ║║─ ║╔═╣ ║╔╗║ ║╬║ ║║─ ║╦╝") +
    "\n" +
    chalk.whiteBright("─║║─ ║║║ ╔╩╗║ ║║║ ║╚╗ ║╚╗║ ║╠╣║ ║╔╝ ║╚╗ ║╩") +
    "\n" +
    chalk.cyanBright("─╚╝─ ╚═╝ ╚══╝ ╚═╝ ╚═╝ ╚══╝ ╚╝╚╝ ╚╝─ ╚═╝ ╚═╝") +
    "\n" +
    chalk.whiteBright("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~") +
    "\n" +
    chalk.whiteBright("- skrip") +
    chalk.blueBright("[" + ALIAS + "]") +
    " " +
    chalk.whiteBright("Versi : " + VERSION_SC) +
    "\n" +
    chalk.redBright("- tidak dapat terhubung ke server") +
    " " +
    chalk.blueBright("tuyulgaple") +
    "\n";
  return bannerText;
};

const updateBanner = (bannerText) => {
  const updatedBanner = bannerText.replace(
    "╔══╗ ╔╦╗ ╔═╦╗ ╔╦╗ ╔╗─ ╔══╗ ╔══╗ ╔═╗ ╔╗─ ╔═╗\n╚╗╔╝ ║║║ ╚╗║║ ║║║ ║║─ ║╔═╣ ║╔╗║ ║╬║ ║║─ ║╦╝[37m\n─║║─ ║║║ ╔╩╗║ ║║║ ║╚╗ ║╚╗║ ║╠╣║ ║╔╝ ║╚╗ ║╩╗[36m\n─╚╝─ ╚═╝ ╚══╝ ╚═╝ ╚═╝ ╚══╝ ╚╝╚╝ ╚╝─ ╚═╝ ╚═╝[37m\n",
    "[34m╔══╗ ╔╦╗ ╔═╦╗ ╔╦╗ ╔╗─ ╔══╗ ╔══╗ ╔═╗ ╔╗─ ╔═╗\n[37m╚╗╔╝ ║║║ ╚╗║║ ║║║ ║║─ ║╔═╣ ║╔╗║ ║╬║ ║║─ ║╦╝\n[36m─║║─ ║║║ ╔╩╗║ ║║║ ║╚╗ ║╚╗║ ║╠╣║ ║╔╝ ║╚╗ ║╩╗\n[37m─╚╝─ ╚═╝ ╚══╝ ╚═╝ ╚═╝ ╚══╝ ╚╝╚╝ ╚╝─ ╚═╝ ╚═╝\n"
  );
  return updatedBanner;
};

const writeToFile = async (filePath, content) => {
  await writeFileAsync(filePath, content, "utf-8");
};

const readJsonFile = (filePath) => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    return null;
  }
};

const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
    return {
      status: true,
      message: "File deleted successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: "Error deleting the file",
    };
  }
};

const getAllFilesFromFolder = (folderName) => {
  let fileList = [];
  function readDirRecursive(directory) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        readDirRecursive(fullPath);
      } else {
        fileList.push(fullPath);
      }
    });
  }
  readDirRecursive(getSessionDirectory(folderName));
  return fileList;
};

const groupAccounts = (accounts, groupSize) => {
  const groupedAccounts = [];
  for (let i = 0; i < accounts.length; i += groupSize) {
    groupedAccounts.push(accounts.slice(i, i + groupSize));
  }
  return groupedAccounts;
};

const getUserFromUrl = (url) => {
  const params = new URLSearchParams(url);
  const userParam = params.get("user");
  if (!userParam) {
    throw new Error("Parameter 'user' tidak ditemukan di URL");
  }
  const decodedUser = decodeURIComponent(userParam);
  const user = JSON.parse(decodedUser);
  return user;
};

export {
  getOrdinalSuffix,
  convertTimestamp,
  getCurrentTime,
  formatNumber,
  createSessionDirectory,
  getSessionDirectory,
  getAllFilesFromFolder,
  writeToFile,
  readJsonFile,
  deleteFile,
  runtimeServer,
  updateBanner,
  groupAccounts,
  getUserFromUrl,
};
