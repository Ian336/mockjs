export default (ImgId) => {
    return process.env.BASE_API + "/getuploadimage/" + ImgId;
  }