const https = require('https');

const POSTRequestWrapper = async (requestName, hostName, apiPath, acceptHeaderValue, authToken, postData) => {
  const postBody = JSON.stringify(postData);
  const options = {
    hostname: hostName,
    port: 443,
    path: apiPath,
    method: 'POST',
    headers: {
      'Content-Type': acceptHeaderValue
    },
    json: true,
    requestCert: true,
    agent: false
  };

  if (authToken !== '') {
    options.headers.Cookie = authToken;
  }

  return await new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let str = '';
      const obj = {
        body: str,
        statusCode: 0,
        headers: []
      };
      response
        .on('data', (data) => {
          str += data;
        })
        .on('end', () => {
          obj.body = str;
          obj.statusCode = response.statusCode;
          obj.headers.push(response.headers);
          resolve(obj);
        })
        .on('error', (err) => {
          obj.body = err;
          obj.statusCode = response.statusCode;
          reject(obj);
        });
    });

    request.on('error', (err) => {
      console.log(`POST request ${requestName} encountered the following error: ${err.message}`);
      reject(err);
    });

    request.write(postBody);
    request.end();
  });
};

const DELETERequestWrapper = async (requestName, hostName, apiPath, acceptHeaderValue, authToken) => {
  const options = {
    hostname: hostName,
    port: 443,
    path: apiPath,
    method: 'DELETE',
    headers: {
      'Content-Type': acceptHeaderValue
    },
    json: true,
    requestCert: true,
    agent: false
  };

  if (authToken !== '') {
    options.headers.Cookie = authToken;
  }

  return await new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let str = '';
      const obj = {
        body: str,
        statusCode: 0
      };
      response
        .on('data', data => {
          str += data;
        })
        .on('end', () => {
          const data = str;
          obj.body = data;
          obj.statusCode = response.statusCode;
          resolve(obj);
        })
        .on('error', err => {
          obj.body = err;
          obj.statusCode = response.statusCode;
          reject(obj);
        });
    });

    request.on('error', (err) => {
      console.log(`DELETE request ${requestName} encountered the following error: ${err.message}`);
      reject(err);
    });

    request.end();
  });
};

module.exports = {
  POSTRequestWrapper: POSTRequestWrapper,
  DELETERequestWrapper: DELETERequestWrapper
};
