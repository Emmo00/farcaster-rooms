const path = require("path");
const config = require("../config");
const express = require("express");

/**
 * Middleware to fill meta tags in the HTML template based on the request route.
 *
 * Reads the index.html file, replaces meta tag placeholders with dynamic values,
 * and sends the resulting HTML as the response.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {void}
 */
function fillMetaTags(req, res, next) {
  const indexFilePath = path.join(
    __dirname,
    config.frontend.buildDir,
    "index.html"
  );

  fs.readFile(indexFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading page").end();
    }

    const metaTags = generateMetaTags(req);

    // Replace placeholders with actual meta tag values
    const html = data
      .replace("{{title}}", metaTags.title)
      .replace("{{description}}", metaTags.description)
      .replace("{{ogTitle}}", metaTags.ogTitle)
      .replace("{{ogDescription}}", metaTags.ogDescription)
      .replace("{{ogImage}}", metaTags.ogImage);

    res.send(html).end();
  });
}

/**
 * Generates meta tag values based on the request route.
 *
 * @param {import('express').Request} req - Express request object.
 * @returns {{
 *   title: string,
 *   description: string,
 *   ogTitle: string,
 *   ogDescription: string,
 *   ogImage: string
 * }} Object containing meta tag values.
 */
function generateMetaTags(req) {
  const url = req.url;
  let metaTags = {
    title: "Farcaster Rooms",
    description: "Live Audio on Farcaster",
    ogTitle: "Farcaster Rooms",
    ogDescription: "Live Audio on Farcaster",
    ogImage: "https://yoursite.com/default-image.jpg",
  };

  // Dynamic meta tags based on route
  if (url.startsWith("/rooms/")) {
    const roomId = url.split("/")[2];
    metaTags = {
      title: `Room ${roomId} - Your App`,
      description: `Join room ${roomId} for interactive conversations`,
      ogTitle: `Room ${roomId}`,
      ogDescription: `Join room ${roomId} for interactive conversations`,
      ogImage: `https://yoursite.com/room-${roomId}-image.jpg`,
    };
  } else if (url.startsWith("/share/")) {
    const fid = url.split("/")[2];
    metaTags = {
      title: `Shared Content - Your App`,
      description: `Check out this shared content`,
      ogTitle: `Shared Content`,
      ogDescription: `Check out this shared content`,
      ogImage: `https://yoursite.com/share-${fid}-image.jpg`,
    };
  }

  return metaTags;
}

module.exports = { fillMetaTags, generateMetaTags };
