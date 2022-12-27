const axios = require("axios");

const makeApiCall = async () => {
  try{

    const data = {
      playlist_name: "playlistName",
      user_FUI: "uid",
    };


    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",?
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3NTNiYmFiM2U4YzBmZjdjN2ZiNzg0ZWM5MmY5ODk3YjVjZDkwN2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20va2luaWRlYXMtZmlyZWJhc2UiLCJhdWQiOiJraW5pZGVhcy1maXJlYmFzZSIsImF1dGhfdGltZSI6MTY3MjMyMTYzOCwidXNlcl9pZCI6IlZKOU05eFFWeWpoOVVjQU5lZWRWVWt1c1NTaTIiLCJzdWIiOiJWSjlNOXhRVnlqaDlVY0FOZWVkVlVrdXNTU2kyIiwiaWF0IjoxNjcyMzIxNjM4LCJleHAiOjE2NzIzMjUyMzgsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3QxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.nJchFjfNLw3fPNvf8F2fCyfyD59dYHJM1xN2wMYifeOXfFpkUrpufErUrEaCmnGdCE24qBdQZsTdSJh1uzwpOi9-SjiJv1iniiYrlGGoaR8QiE-dJkDjJQDxp6mgLOB03qa6LyD8rcigc347tih2L4WNmvKOEql-rfIDn_cy2znJeVx5kcEvC8vhfU5SDJc_EHUDP7YqhQ8QLKIyHGl7WJmr_INH22r-b4WEaGbVDa9dmDWfMzygPl1Y6Td4i7cd_tEtb6DGAe6wTdrNe_l6DADR85UwMhwY-DhiUdc4ZrfQibBwbFP57y0GCBFx59t8gUuj8qBMv28EzwACyLQtjw",
      },
    };
 
    const response = await axios.post(
      "https://zemamultimediaapimanagement.azure-api.net/music/mobileApp/playlists?userId=123",
      data,
      axiosConfig
    );

  console.log(response.status);
  }catch(e){
    console.log(e.response);
  }
};

makeApiCall();