const useCalculateViews = (statistics) => {
  let views;
  if (statistics) {
    const view = statistics.viewCount;
    const viewLength = view.length;

    const viewNum = parseFloat(view);
    if (viewLength >= 4 && viewLength < 6) {
      views = (viewNum / 1000).toFixed(2) + "K";
    } else if (viewLength >= 6 && viewLength < 9) {
      views = (viewNum / 100000).toFixed(2) + "M";
    } else if (viewLength >= 9) {
      views = (viewNum / 100000000).toFixed(2) + "B";
    }
    return views;
  }
};

export default useCalculateViews;
