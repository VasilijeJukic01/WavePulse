const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VUE_APP_AWS_REGION
});

const getPreSignedUrl = async (key) => {
  const params = {
    Bucket: process.env.VUE_APP_AWS_S3_BUCKET_NAME,
    Key: `covers/${key}.jpg`,
    Expires: 60 * 5
  };

  return await s3.getSignedUrlPromise('getObject', params);
};

module.exports = {
  getPreSignedUrl
}
