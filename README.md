# Friendly Feedback Form

Build a clean, modern customer support feedback form as a single page.




The form should have:

- A heading "Customer Support" with a short friendly subtitle

- A text field: "Your Name"

- An email field: "Your Email"

- A larger text area: "How can we help? Describe your issue or feedback"

- A "Submit" button




When the user clicks Submit:

- Send the form data as a JSON POST request to a webhook.

- Read the webhook URL from a secret named N8N_WEBHOOK_URL. Do NOT hardcode it.

- The JSON body must use exactly these keys: customerName, customerEmail, feedback

- Show a loading state, then on success show a thank-you message.




No backend or database is needed. Keep it friendly with soft colours and rounded corners

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6bcf1d96-17f6-46be-b18d-ac430561ba53).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
