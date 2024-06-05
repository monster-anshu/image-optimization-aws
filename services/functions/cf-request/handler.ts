import type { Handler } from "aws-lambda";

export const handler = async (evt, context, cb) => {
  var req = evt.Records[0].cf.request;

  if (
    req.uri &&
    req.uri.length &&
    req.uri.substring(req.uri.length - 1) === "/"
  ) {
    var uri = req.uri + "index.html";

    console.log('changing "%s" to "%s"', req.uri, uri);
    req.uri = uri;
  }

  cb(null, req);
};
