const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry);
    } else {
      console.log(entry.target);
    }
  });
};

export const observer = new IntersectionObserver(callback);
