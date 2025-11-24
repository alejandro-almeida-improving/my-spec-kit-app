/* eslint-disable @typescript-eslint/no-require-imports */

const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABcJUIG34qIPKVbVQ2Rbfv0jJaESD-Ay68dcAajXiXl5K-nJ_K1d_hxqhiUs7l6yV0jdEy9er8kV_lSgx_zS98gd1I5hqxVLmki2EW4pX_fY62NygL-ht_ir4QKIiIDq9OM5rpornjaObOf52mxM7hhdCcwc06FanCi4WQxcgrpHZAlc14ZanC68U0CjwDrM0TeG4H7AEgSQQlVh2xzDR26ZsJ5vA9eDEo8IcSME.jpg?r=c06",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABZWsSnwFkQj0Gyh0l7HhF0Vqy3xi0DZi0wWigC1tCOD8slTpnFvvRfP965YVdwep4lnOA3EUv5iv7XGvHhHi56m7a1zYNclx5-r3zm9JdRGrR63qH8T2LOLM6oUBshwRWKvLnO6Hqiski-bnoofpCUDBnE6hl723eWVu9hVvPGT4aXlkAnYzJQdrCoBGBk3syk_Cp-MgWAVo-YP0TgUg_o4acUhXhr0pQBElRGI.jpg?r=bc2",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABT2mZQamY05LUZ7yJwaEM6hk-YIoaQM6uqL2j_KHYe_QQcTdigpBFjpiXuosRxH-LO5HVQDe269NnTE0QUP6h8Hc9j-6jiyH_gHvRM8CHTP1g2lKTEXk2KO8HXJeAn9dJbF4Iq4lFq6qDyRFOLZSMI9jHXD3hg8vSAU.jpg?r=b78",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABf24KaUA3ctfGg-TpHh1HQudSFheDYuiQVEpzeRPc2jU1kgmYBntJK5nEXuVVajz493s2sP3VlLPcFBELq7295Fi3WKRmyXzI_gU8spNoenGlbPkhYLaibuJbPM4C35vmKxXk8t0sgIAPvUInmZTlMCBeODAOkH9MSj7kFMKeP18LprIFCLYmYwexPL9gmqkd-s5WPN6RcCRdcedHrmLHwTQ7B772fkUsnzPdc8.jpg?r=e2a",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABSSd9WrovB-pSQ5sh1jWhcASxHvIY_Ejv8FmcHWsWG1YeIa5QOmPysIgTJnwy1PVWmDUj1B4Xw1SCA6oUa6tWK8xoC42Fm8n2K8_-BsokJRkI6B67wamzJwFcvjHFS1F1zIfZP76mbELS-vTtOLkZBiQwvUBmev7wVFLs0xilQcW.jpg?r=d1e",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABcXDXCKxknJYprdSU0FLBSuRcWtYb94QrUWNTO-JvsjC_dl9JxU39rKiJRfHBc9ChyKv0YqB9lCX3kYTrYDrsqEG78tjPwBaqSo.jpg?r=12e",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABbp3a7N5x6afJW42PTnj7O0jfTi4q5VE63C1ZU79WD5GtCNizk0nuvwpr4knG4Ck9zeQV3e5U-o3zv_57NSPx5Ybj_WR7lwNu8A.jpg?r=d3f",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABRcD0BoPdnjFBiAvrVbtGy1unlcrVDUh0Dtl68GTPnMnHJ9EgaLf61l2SHDnY-5IChykHsM1ldHUQw5fNLjbqUjaBDYHmnjBNgQ.jpg?r=3dd",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABRWIohBhVJ4Hnlfd4Hdr6Mjwci94ey7MfH1oxkfR8H46ccxL5Xg1WmvJRTtd4UwNjgeJcNc5a9nwvlz8Y-gA85TkSyuRwS8q_qQ.jpg?r=685",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABcjsr5lES8yerwRrrCEfKeS3rmLecKK81sA9QtpYz3xdBvain4txAU219dpI1q_--hC-j9hxEESs3uc8ad6hT-yEjGbd-Sll0yY.jpg?r=9e1",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABRrr-OjMrZEjBUcbC1dNkFX4V7ghEIIQ8iHk3eOSVqSk4SfOSeHe0cxa5icuTgkHknN9rv4gnpW5yneujwMdi79OFy_5hSh-AuE.jpg?r=11f",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABYVcmd2Fexcn1iCWo01qNaT8VCIg86dYN_J3faZIi8NQlXEyLYttTN67zk97yKyACTXkJVryUgdTiAFfjbbWHaI7yIQQdac9KeQ.jpg?r=942",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABUKXLDRLjJyjd9bkB1VLmGo4RdFxpfH8bmVwHsHWbnjIT7MofKtIQzU4Q_l2CvDcN4-yMjC43PzU9pxwpJZF0VKChO5Udamq--E.jpg?r=d36",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABbNjURObHIgfglxCOul8hKeXcpQ_UwLdbubRyZVEHuAUhg-qwUJb2ShtUxyYD7LlLdIqypcJvnfA7d2NijZrVYR1AEEh6WjsP8U.jpg?r=0d8",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABXfzai6JiqvWDXzOSodLKfPlayng8biB_dL17GRHOLtVJ7CZP175uY4spl1smx092YnqA-BKWbS9U3SZFanJPshDPkid8EIdgLM.jpg?r=a17",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABVamXFexs5Ij_IF0pAcXCfq8InaRVyWz8dwXOGe-zIeHzNK7M-977tHpYv2XpU2bc-lKfHj16I3tzrsHS4nW_pQs7zZ8R4900T8.jpg?r=e1b",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABVgwbj_TK3nPvbL_Bvm96qjSsiGscpiQ-KEfXG4TIpuFFyndLHtO3xfeMKBmNkH7Rt8KIjZTvfrk0Srry_KLkXlPQIW3mOyAw4E.jpg?r=35c",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABQFxrxmTs4sG6OnsGzUA81qUpWceIlJnauvh5mU2xD9UcRD-n1uomJErp-dB31P3xuXventyT19y4hUGlLTDEnSUBSoq5dq992o.jpg?r=fed",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABTD-C1QENesBiyhEhejz3EvX8ooC-Zi1I_tz2S-d9yZ41UGdLurQw-hA3bdN2-A_pMFwsGnc2HnCeuFCwP4j6l8Si3YKmxlpIVs.jpg?r=73b",
  "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABVfXcjE9iW_-l1WMwI-2ouzB50CK9i520GltDvJUJYeA7SLmp952FWpxk_Q1tyjqrcNtF7v_ZNBqmhqmIw3FnBD7ldKrRhP41MWFBv_ikk6zFI3ew0SdUYnSHqNpksddFhgkd0rIHqOto7M7Y1i54r4ZkbcsBScyHM-rZGkN27kLp-ZISEfSYNchmfLN0SpNobAHmEA-aof-WUYLsPFW5iP2jKMJYZ5IRlEhlIY.jpg?r=420"
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'movies');

// Asegurarse de que el directorio existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(outputDir, filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(outputDir, filename), () => {});
      console.error(`Error downloading ${filename}:`, err.message);
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log(`Downloading ${images.length} images...`);
  
  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    const filename = `movie-${i + 1}.jpg`;
    
    try {
      await downloadImage(url, filename);
    } catch (err) {
      console.error(`Failed to download image ${i + 1}`, err);
    }
    
    // Pequeña pausa para no sobrecargar el servidor
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('All images downloaded!');
}

downloadAllImages().catch(console.error);
