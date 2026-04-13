"use client";

import { useEffect, useMemo } from "react";

const TENOR_GIFS = [
  {
    postId: "6201622217547275472",
    url: "https://tenor.com/en-GB/view/happy-happy-happy-gif-6201622217547275472",
    title: "Happy Happy Happy",
  },
  {
    postId: "14265759167703571893",
    url: "https://tenor.com/en-GB/view/smile-meme-gif-14265759167703571893",
    title: "Smile Meme",
  },
  {
    postId: "8377674878943593503",
    url: "https://tenor.com/en-GB/view/i-love-you-gif-8377674878943593503",
    title: "I Love You",
  },
  {
    postId: "10000605937555107357",
    url: "https://tenor.com/en-GB/view/kitty-cat-cat-in-love-in-love-cat-happy-gif-10000605937555107357",
    title: "Kitty Cat In Love",
  },
  {
    postId: "8113361418257719338",
    url: "https://tenor.com/en-GB/view/快乐-跳舞-happy-dance-gif-8113361418257719338",
    title: "Happy Dance",
  },
  {
    postId: "5549795156449910681",
    url: "https://tenor.com/en-GB/view/apu-apustaja-apu-apuapustaja-aputheworld-cute-gif-5549795156449910681",
    title: "Apu Apustaja Cute",
  },
  {
    postId: "10370083014486590835",
    url: "https://tenor.com/en-GB/view/pengu-pudgy-penguin-pudgypenguins-happy-dance-gif-10370083014486590835",
    title: "Pudgy Penguin Happy Dance",
  },
  {
    postId: "24971745",
    url: "https://tenor.com/en-GB/view/cats-gif-24971745",
    title: "Cats",
  },
  {
    postId: "17894939248589497231",
    url: "https://tenor.com/en-GB/view/froggie-frogs-heart-cute-cartoon-frog-cartoon-frog-gif-17894939248589497231",
    title: "Froggie Heart",
  },
  {
    postId: "8986898329054329350",
    url: "https://tenor.com/en-GB/view/cheering-baby-yeah-woo-hoo-lets-go-excited-kid-gif-8986898329054329350",
    title: "Cheering Baby",
  },
  {
    postId: "17885812",
    url: "https://tenor.com/en-GB/view/happy-happy-dog-dog-happiest-dog-super-happy-gif-17885812",
    title: "Happy Dog",
  },
  {
    postId: "16498763039499928961",
    url: "https://tenor.com/en-GB/view/spongebob-cant-wait-impatient-anxious-eagerly-gif-16498763039499928961",
    title: "Spongebob Cant Wait",
  },
  {
    postId: "11132015410698200956",
    url: "https://tenor.com/en-GB/view/happy-dance-gif-gif-11132015410698200956",
    title: "Happy Dance Gif",
  },
  {
    postId: "17198633206407312889",
    url: "https://tenor.com/en-GB/view/dance-girl-happy-dance-moves-happy-dance-shades-on-gif-17198633206407312889",
    title: "Dance Girl Happy",
  },
  {
    postId: "17760742",
    url: "https://tenor.com/en-GB/view/girl-kid-cute-move-dance-gif-17760742",
    title: "Girl Kid Cute Dance",
  },
  {
    postId: "17903032272093957028",
    url: "https://tenor.com/en-GB/view/cliffytoaster-gif-17903032272093957028",
    title: "Cliffytoaster",
  },
];

const POSITIONS = [
  { top: "1%", left: "2%" },
  { top: "2%", left: "35%" },
  { top: "5%", left: "68%" },
  { top: "18%", left: "15%" },
  { top: "15%", left: "50%" },
  { top: "20%", left: "82%" },
  { top: "35%", left: "0%" },
  { top: "33%", left: "30%" },
  { top: "38%", left: "60%" },
  { top: "50%", left: "12%" },
  { top: "52%", left: "45%" },
  { top: "48%", left: "78%" },
  { top: "68%", left: "3%" },
  { top: "65%", left: "33%" },
  { top: "70%", left: "62%" },
  { top: "72%", left: "85%" },
];

const SIZES = [220, 280, 180, 320, 190, 160, 300, 200, 260, 170, 310, 185, 240, 290, 175, 210];

const ROTATIONS = [-8, 5, -3, 7, -5, 4, -6, 3, -7, 6, -4, 8, -2, 5, -9, 3];

export default function Wow() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const shuffledIndices = useMemo(() => {
    const indices = TENOR_GIFS.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FBD3D7",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {TENOR_GIFS.map((gif, idx) => {
        const posIdx = shuffledIndices[idx];
        const pos = POSITIONS[posIdx];
        const size = SIZES[posIdx];
        const rotation = ROTATIONS[posIdx];

        return (
          <div
            key={gif.postId}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              width: `${size}px`,
              transform: `rotate(${rotation}deg)`,
              zIndex: idx + 1,
              overflow: "hidden",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `rotate(0deg) scale(1.15)`;
              e.currentTarget.style.zIndex = "100";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`;
              e.currentTarget.style.zIndex = `${idx + 1}`;
            }}
          >
            <div
              className="tenor-gif-embed"
              data-postid={gif.postId}
              data-share-method="host"
              data-aspect-ratio="1"
              data-width="100%"
            >
              <a href={gif.url}>{gif.title}</a> from{" "}
              <a href="https://tenor.com">Tenor</a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
