# OptomerTrust

This repository contains the source code for the **OptomerTrust** website. The site consists of a single HTML page with an interactive assessment and a ConvertKit form.

## Running Locally

Clone the repository and open `index.html` directly in your browser. Alternatively, you can serve the directory with a simple HTTP server:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.

## Deploying with GitHub Pages

1. Push the repository to GitHub.
2. In the repository, open **Settings → Pages** and select **Deploy from a branch**, choosing `main` as the source.
3. The `CNAME` file already contains `www.optomertrust.com`. Update your DNS to add a CNAME record from `www` to `<USERNAME>.github.io`.
4. Once DNS propagates, your site will be available at `https://www.optomertrust.com`.

## ConvertKit Form

The page embeds a ConvertKit form using this script:

```html
<script async data-uid="a831b41af7" src="https://optomertrust-com.kit.com/a831b41af7/index.js"></script>
```

Ensure the form is published in ConvertKit and the URL is correct. Replace the script tag if you update the form.

## License

This project is licensed under the [MIT License](LICENSE).

