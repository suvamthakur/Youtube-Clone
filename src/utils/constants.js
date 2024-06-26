const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const YOUTUBE_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const SINGLE_YOUTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" +
  GOOGLE_API_KEY +
  "&id=";

export const YOUTUBE_SEARCH_SUGGESTION_API =
  "https://corsproxy-la3g.onrender.com/full/?url=http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_SEARCH_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&key=" +
  GOOGLE_API_KEY +
  "&q=";
