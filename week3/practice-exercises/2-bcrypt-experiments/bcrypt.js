import { hash, compare } from "bcrypt";
import crypto from "crypto";

const experiment1 = async () => {
  const password = "HackMyFuture";
  const hashedPassword1 = await hash(password, 10);
  console.log(`Password hashed for the first time: ${hashedPassword1}`);
  const hashedPassword2 = await hash(password, 12);
  console.log(`Same password hashed for the second time: ${hashedPassword2}`);
};

// This below function checks if bcrypt hash length changes with different input sizes.
// It prints each input’s length and its corresponding hash, showing that bcrypt's output is always the same length regardless of input.

const experiment2 = async () => {
  //Defines an asynchronous function named experiment2, allowing the use of await inside it.
  const lengths = [1, 10, 100, 1000];
  //Creates an array called lengths that contains different input sizes we want to test — short to long strings.
  for (const len of lengths) {
    // Starts a loop that will run once for each len value (1, 10, 100, 1000).
    const str = crypto.randomBytes(len).toString("base64").slice(0, len);
    // Generates a random string of exactly len characters:
    // crypto.randomBytes(len) creates a buffer of random bytes.
    // .toString("base64") converts it into a readable base64 string.
    // .slice(0, len) trims it to the exact number of characters you want.
    // 📌 Note: base64 encoding expands the byte size, so we slice it to ensure length matches len.
    const hashed = await hash(str, 10);
    // Uses bcrypt's hash() function to hash the random string with 10 salt rounds.
    // await waits for the hashing to complete before moving on.
    console.log(
      `Input length: ${len}, Hash: ${hashed}, Hash length: ${hashed.length}`
    );
    // Logs: The original input length, The resulting bcrypt hash, And the length of the hash (which is always 60 characters for bcrypt).
  }
};

const experiment3 = async () => {
  const password = "HackMyFuture";
  for (let saltRounds = 1; saltRounds <= 18; saltRounds++) {
    const label = `Hashing time with ${saltRounds} salt rounds`;
    console.time(label);
    await hash(password, saltRounds);
    console.timeEnd(label);
  }
  // const password = "HackMyFuture";
  // console.time("Hashing time with 8 salt rounds");
  // const hashedPassword1 = await hash(password, 8); // Hashing time: 37.56ms
  // console.timeEnd("Hashing time with 8 salt rounds");
  // console.time("Hashing time with 10 salt rounds");
  // const hashedPassword2 = await hash(password, 10); // Hashing time: 143.817ms
  // console.timeEnd("Hashing time with 10 salt rounds");
  // console.time("Hashing time with 12 salt rounds");
  // const hashedPassword3 = await hash(password, 12); // Hashing time: 406.752ms
  // console.timeEnd("Hashing time with 12 salt rounds");
  // console.time("Hashing time with 18 salt rounds");
  // const hashedPassword4 = await hash(password, 18); // Hashing time: 22.477s
  // console.timeEnd("Hashing time with 18 salt rounds");
};

const main = async () => {
  console.log("Experiment 1:");
  await experiment1();

  console.log("\nExperiment 2:");
  await experiment2();

  console.log("\nExperiment 3:");
  await experiment3();
};

main().catch(console.error);
