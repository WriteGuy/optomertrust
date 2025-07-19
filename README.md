# OptomerTrust

This repository contains the static HTML for the **OptomerTrust Assessment**. It presents a short questionnaire and reveals a "lens" result to visitors.

## ConvertKit Integration

Visitors can submit their email to receive a full lens profile and updates. The `submitEmail()` function posts the address to the ConvertKit API. To enable this in production, replace `YOUR_PUBLIC_API_KEY` in `index.html` with your actual ConvertKit API key.

## Development

Simply open `index.html` in a browser. There are no build steps or external dependencies.
