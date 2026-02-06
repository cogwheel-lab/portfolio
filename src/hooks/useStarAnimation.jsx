import { useEffect } from "react";
import todoStyles from "@/components/Todo/Todo.module.scss";

const starColors = [
  "/star-blue.svg",
  "/star-green.svg",
  "/star-orange.svg",
  "/star-purple.svg",
  "/star-red.svg",
  "/star-yellow.svg",
];

export const useStarAnimation = () => {
  const createStar = (x, y, index, totalCount) => {
    const star = document.createElement("img");
    star.classList.add(todoStyles.star);

    const randomStar = starColors[Math.floor(Math.random() * starColors.length)];
    star.src = randomStar;

    const size = Math.random() * 7 + 8;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    const baseAngle = (index / totalCount) * Math.PI * 2;
    const jitter = (Math.random() - 0.5) * 0.5;
    const angle = baseAngle + jitter;
    const distance = Math.random() * 40 + 20;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rotation = Math.random() * 360 - 180;

    star.style.setProperty("--tx", `${tx}px`);
    star.style.setProperty("--ty", `${ty}px`);
    star.style.setProperty("--rot", `${rotation}deg`);

    document.body.appendChild(star);

    star.addEventListener("animationend", () => {
      star.remove();
    });
  };

  const triggerStars = (x, y) => {
    const starCount = Math.floor(Math.random() * 4) + 3;

    for (let i = 0; i < starCount; i++) {
      setTimeout(() => createStar(x, y, i, starCount), i * 15);
    }
  };

  return { triggerStars };
};
