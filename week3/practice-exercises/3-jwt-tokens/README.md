# JWT Token Experiments

In this exercise, we will use and test the `jsonwebtoken` library to understand how JWT tokens work.

## Experiment 1

### Question

Can we verify a JWT using a different application?
✅ Yes, the JWT can be verified on jwt.io by pasting the correct secret (HackMyFuture).

### Experiment

1. Use `jwt.sign()` to sign a new payload with a secret of your choice. Print the result to the console.
2. Copy the JWT and paste it into https://www.jwt.io/. You will see the payload and an "Invalid Signature" message.
3. On the bottom right, below the payload, paste the password you used to sign the JWT.

### Analyze

- Can we see the JWT payload without having access to the secret?
  ✅ You can see the payload without the secret (JWTs are not encrypted).
- Should we use a JWT to hide sensitive information?
  ❌ Sensitive data should NOT be stored in a JWT.
- Can we sign a JWT from application 1 and verify it from a different application?
  ✅ A JWT signed in one app can be verified in another, as long as they share the same secret.

## Experiment 2

### Question

What happens when we create JWT tokens with the same payload but different secrets?
✅ The tokens are completely different, even though the payload is the same.

### Experiment

Use jsonwebtoken's `sign` function to create two JWT tokens with the same payload but different secret keys. Print both tokens to the console and try to verify each token with both secrets.

### Analyze

- Are the tokens similar or different? What parts are similar? What parts are different?
  ✅ Only the header and payload sections are the same (they are Base64-encoded).
- Is it possible to guess the secret that was used from a signed JWT?
  ✅ The signature changes depending on the secret.
  ❌ It's not possible to guess the secret from a token — that's the whole point of the signature.

## Experiment 3

### Question

What happens if we try to verify a token with an incorrect secret?
❌ If you use the wrong secret, verification fails with "invalid signature".

### Experiment

Try to verify the following JWT:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwidXNlcm5hbWUiOiJCb2IiLCJpYXQiOjE3NTUwOTc1ODN9.ioN3ccbmfyTnnPT0uc54wvsVtoOXqYNkwLytF8XI5ac
```

1. With a wrong secret - `12345678`
2. With the correct secret - `hackmyfuture`

Print the results to the console.

### Analyze

- What happens when you try to verify a token with an invalid password?
  ✅ With the correct secret (hackmyfuture), the payload is successfully decoded.
- What happens if someone else discovers our secret?
  ⚠️ If someone discovers your secret, they can:

⚠️ Forge valid tokens,

⚠️ Impersonate users,

⚠️ Compromise your system.
