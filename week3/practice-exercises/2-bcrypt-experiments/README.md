# Bcrypt Experiments

In this exercise, we will use and test the bcrypt library to understand how it works.

## Experiment 1

### Question

What will happen if we hash the same password twice?

### Experiment

Use bcrypt's `hash` function twice with the same input string and hash rounds. Print both hashes to the console.

### Analyze

- Are the hashes similar or different? Why do you think this is the case?
- What is the advantage of this kind of design?

### Observations:

✅ Answer
When you hash the same password twice using bcrypt with the same number of salt rounds, the resulting hashes will be different.

🔍 Why?
Bcrypt automatically generates a random salt each time you hash a password. This makes each hash unique, even if the input is the same.

✅ Advantage
This design improves security by protecting against rainbow table attacks. Even if two users have the same password, their stored hashes will be different.

## Experiment 2

### Question

Do different string lengths affect the hash length?

### Experiment

Hash different strings with different lengths: 1, 10, 100, and 1000 characters. Print the output hashes.

_Hint: use `crypto.randomBytes(1000).toString('base64').slice(0,1000)` to create a large random string._

### Analyze

- Is there a difference between the output hash lengths?
  ❌ No — all hashes are 60 characters long regardless of input length.

- Is it possible for two different strings to have the same bcrypt hash?
  ❌ Extremely unlikely — bcrypt includes a random salt, making hash collisions nearly impossible.

✅ Summary
Bcrypt always outputs fixed-length hashes (60 chars for $2b$ format).

Different inputs → different hashes.

Even same inputs → different hashes (due to salt).

## Experiment 3

### Question

How do salt rounds affect performance?

### Experiment

Use bcrypt's `hash` function to hash the same password with different salt rounds: 1, 2, 3, ... 18. Use a for loop for this. Inside the for loop, use `console.time` to measure the duration of the operation:

```
console.time("Hashing time");
// Hash
console.timeEnd("Hashing time");
```

Print the output hash for each salt round.

### Analyze

- How long did it take to hash with 18 salt rounds? 22.935 seconds

- Does increasing the salt rounds make the hash longer? No, hash length stays the same

- Why is it important for the hashing process to be slow? To thwart brute-force attacks

Making the hashing process intentionally slow adds a layer of security against brute-force and dictionary attacks.

🔐 Here's why:
Attackers try millions of passwords per second using powerful hardware.

A fast hash allows them to test a huge number of guesses quickly.

A slow hash (like bcrypt) makes each guess take longer (e.g. 100ms), drastically reducing how many passwords they can try per second.

📌 Example:
If hashing takes 0.001ms, an attacker can try 1 million+ passwords/sec.

If hashing takes 300ms, they can only try about 3 per second.

✅ In short:
A slow hash protects your users' passwords by making large-scale attacks impractical and expensive.

- Would you use 18 rounds in your production application? No, too slow

- Do a quick research to find the recommended number of salt rounds these days. 10–12 rounds (OWASP & bcrypt docs suggest this range)

### Experiment 3 observations:

Hashing time with 1 salt rounds: 2.297ms
Hashing time with 2 salt rounds: 2.113ms
Hashing time with 3 salt rounds: 4.85ms
Hashing time with 4 salt rounds: 1.97ms
Hashing time with 5 salt rounds: 8.891ms
Hashing time with 6 salt rounds: 6.218ms
Hashing time with 7 salt rounds: 20.198ms
Hashing time with 8 salt rounds: 36.582ms
Hashing time with 9 salt rounds: 61.464ms
Hashing time with 10 salt rounds: 109.004ms
Hashing time with 11 salt rounds: 205.692ms
Hashing time with 12 salt rounds: 381.863ms
Hashing time with 13 salt rounds: 715.738ms
Hashing time with 14 salt rounds: 1.446s
Hashing time with 15 salt rounds: 2.799s
Hashing time with 16 salt rounds: 6.763s
Hashing time with 17 salt rounds: 13.044s
Hashing time with 18 salt rounds: 22.935s
