import gsap from "gsap";

export const animatePageIn = () => {
  const banner1 = document.getElementById("banner-1");
  const banner2 = document.getElementById("banner-2");
  const banner3 = document.getElementById("banner-3");
  const banner4 = document.getElementById("banner-4");

  if (banner1 && banner2 && banner3 && banner4) {
    const tl = gsap.timeline();
    const bannersArray = [banner1, banner2, banner3, banner4];
    tl.set(bannersArray, {
      top: 0,
    }).to(bannersArray, {
      top: "100vh",
      stagger: 0.2,
    });
  }
};
