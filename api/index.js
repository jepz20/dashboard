// TODO remove this hard coded host
// const host = window.location.host;
const host = 'localhost:2205';

export const fetchIssuesDetail = () => (
  fetch(`http://${host}/data/issues_detail.csv`).then(response => {
    let reader = response.body.getReader();
    let completeText = '';
    let decoder = new TextDecoder();
    return reader.read().then(result => {
      completeText += decoder.decode(result.value || new Uint8Array, {
        stream: !result.done,
      });
      let allRows = completeText.split('\n');
      let keys;
      let arr = [];
      if (allRows.length > 0) {
        let header = allRows.splice(0, 1);
        keys = header[0].split(',').map(key => key = key.trim());
        allRows.forEach((row) => {
          if (row.length < 1) {
            return;
          };

          let obj = {};
          let properties = row.split(',');
          properties.forEach((property, index) => {
            let key = keys[index];
            obj[key] = property;
          });
          arr.push(obj);
        });
      };

      return arr;
    });
  }).then(result => result)
);

export const fetchGeolocationDetail = () => (
  fetch(`http://${host}/api/geolocation`)
  .then(response => response.json())
  .then(geolocationData => geolocationData)
);
