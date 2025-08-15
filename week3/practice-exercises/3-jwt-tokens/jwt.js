import jwt from "jsonwebtoken";

const experiment1 = () => {
  const payload = { userId: 123, username: "Alex" }; // your custom payload
  // Add your code here
  const secret = "HackMyFuture"; // your chosen secret
  const token = jwt.sign(payload, secret); // sign the JWT
  console.log("Generated JWT:", token); // print to console
};

const experiment2 = async () => {
  const payload = { userId: 123, username: "Alex" };
  // Add your code here
  const secret1 = "HackYMyFuture";
  const secret2 = "HackYourFuture";
  const token1 = jwt.sign(payload, secret1); // sign the JWT with a different secret with the same payload
  const token2 = jwt.sign(payload, secret2); // sign the JWT with a different secret with the same payload
  console.log("Generated JWT 1:", token1); // print to console
  console.log("Generated JWT 2:", token2); // print to console
};

const experiment3 = async () => {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwidXNlcm5hbWUiOiJCb2IiLCJpYXQiOjE3NTUwOTc1ODN9.ioN3ccbmfyTnnPT0uc54wvsVtoOXqYNkwLytF8XI5ac`;
  const wrongSecret = "12345678";
  const correctSecret = "hackmyfuture";
  //const decoded = jwt.verify(token, wrongSecret); if you enable this line instead, you'll get an invalid signature
  const decoded = jwt.verify(token, correctSecret);
  console.log(decoded);
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
