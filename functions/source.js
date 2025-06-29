const agentAddress = args[0];
const taskType = args[1];

const url = `https://afteryield.onrender.com/task?agentAddress=${agentAddress}&type=${taskType}`;

const resp = await Functions.makeHttpRequest({
  url,
  method: "POST"
});

if (resp.error) {
  throw Error(`HTTP error: ${resp.message || resp.response}`);
}

return Functions.encodeString(resp.data.text);
