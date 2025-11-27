import * as fs from "fs";
import * as path from "path";
import * as https from "https";

interface Movie {
  title: string;
  imageUrl: string;
  slug: string;
  category?: string;
}

// Movie data extracted from Netflix page
const movies: Movie[] = [
  {
    title: "Frankenstein",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABcJUIG34qIPKVbVQ2Rbfv0jJaESD-Ay68dcAajXiXl5K-nJ_K1d_hxqhiUs7l6yV0jdEy9er8kV_lSgx_zS98gd1I5hqxVLmki2EW4pX_fY62NygL-ht_ir4QKIiIDq9OM5rpornjaObOf52mxM7hhdCcwc06FanCi4WQxcgrpHZAlc14ZanC68U0CjwDrM0TeG4H7AEgSQQlVh2xzDR26ZsJ5vA9eDEo8IcSME.jpg?r=c06",
    slug: "frankenstein",
    category: "Your Next Watch",
  },
  {
    title: "A Man Called Otto",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABZWsSnwFkQj0Gyh0l7HhF0Vqy3xi0DZi0wWigC1tCOD8slTpnFvvRfP965YVdwep4lnOA3EUv5iv7XGvHhHi56m7a1zYNclx5-r3zm9JdRGrR63qH8T2LOLM6oUBshwRWKvLnO6Hqiski-bnoofpCUDBnE6hl723eWVu9hVvPGT4aXlkAnYzJQdrCoBGBk3syk_Cp-MgWAVo-YP0TgUg_o4acUhXhr0pQBElRGI.jpg?r=bc2",
    slug: "a-man-called-otto",
    category: "Your Next Watch",
  },
  {
    title: "KPop Demon Hunters",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABT2mZQamY05LUZ7yJwaEM6hk-YIoaQM6uqL2j_KHYe_QQcTdigpBFjpiXuosRxH-LO5HVQDe269NnTE0QUP6h8Hc9j-6jiyH_gHvRM8CHTP1g2lKTEXk2KO8HXJeAn9dJbF4Iq4lFq6qDyRFOLZSMI9jHXD3hg8vSAU.jpg?r=b78",
    slug: "kpop-demon-hunters",
    category: "Your Next Watch",
  },
  {
    title: "Counterattack",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABTD-C1QENesBiyhEhejz3EvX8ooC-Zi1I_tz2S-d9yZ41UGdLurQw-hA3bdN2-A_pMFwsGnc2HnCeuFCwP4j6l8Si3YKmxlpIVs.jpg?r=73b",
    slug: "counterattack",
    category: "Your Next Watch",
  },
  {
    title: "65",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABVfXcjE9iW_-l1WMwI-2ouzB50CK9i520GltDvJUJYeA7SLmp952FWpxk_Q1tyjqrcNtF7v_ZNBqmhqmIw3FnBD7ldKrRhP41MWFBv_ikk6zFI3ew0SdUYnSHqNpksddFhgkd0rIHqOto7M7Y1i54r4ZkbcsBScyHM-rZGkN27kLp-ZISEfSYNchmfLN0SpNobAHmEA-aof-WUYLsPFW5iP2jKMJYZ5IRlEhlIY.jpg?r=420",
    slug: "65",
    category: "Your Next Watch",
  },
  {
    title: "The Secret Life of Pets 2",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABbNjURObHIgfglxCOul8hKeXcpQ_UwLdbubRyZVEHuAUhg-qwUJb2ShtUxyYD7LlLdIqypcJvnfA7d2NijZrVYR1AEEh6WjsP8U.jpg?r=0d8",
    slug: "the-secret-life-of-pets-2",
    category: "Your Next Watch",
  },
  {
    title: "The Little Things",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABUrUkCBCs_wWHA0fXUWUqi9-bdb1Got0-HB8xeLa7xpN1hBjy7mCN1z1_I5Ihomi2KfNjL_UDxSmoDdgPuqQ1LQgzfQKNI_IfVuct5Ks5RGKNy8h11aoEsRuuBOE4n2ba17bG7PLVZIomheysSLe9KAcLEb-zMyCqEn8eo6dluCb.jpg?r=187",
    slug: "the-little-things",
    category: "Suspenseful Movies",
  },
  {
    title: "Now You See Me",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABdedr3lFDSICx5rA4xXw_24KwnmVkLw0v2WkzRV-0RFxaTRST-km6ghGpBEGs5tt_i-7iKLcHntrlShAYNVTI7_08VnDU12xaG8.jpg?r=6d1",
    slug: "now-you-see-me",
    category: "Suspenseful Movies",
  },
  {
    title: "Godzilla x Kong: The New Empire",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABSGC_gKboNIzPS77juDzSxf3outa5pBGvWSOUN4u4NUj0LSdkZI_zNak1yruqIhN9L_cSw2mjVCqTLVcph0bIfAZwDJDU4Di0CA.jpg?r=e8b",
    slug: "godzilla-x-kong-the-new-empire",
    category: "Suspenseful Movies",
  },
  {
    title: "Plane",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABXxs0hdjlM-ZRjkx3L4JkoSp5ES6xL-B27JeriG4qSp9PkwaPNxCbi0wwuQjpDqyn9_rOHWp2XPuZPwMFbGn1H6fYpJr1lnux9Q.jpg?r=640",
    slug: "plane",
    category: "Suspenseful Movies",
  },
  {
    title: "The Elixir",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABdxb_r4_2maBiAH1CLC-fj58W0tjLXdkI1YrZp2Uf2-9hBtbcTHcNgFrLPwx6CfU9U1bhIB4ElTWj4g4lHjlOs1y48tlvU2mmfs.jpg?r=bf8",
    slug: "the-elixir",
    category: "Suspenseful Movies",
  },
  {
    title: "The Mother",
    imageUrl:
      "https://occ-0-4592-3997.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABcs--5bUf482uSW7gVBmTfLfcovyylDCcTulhQe7kYSmUjtirRqsrHtJi6UjkOKTqgvT5plFNLn-j8Sqrm57-DIEj0VkkH4XVG8.jpg?r=b32",
    slug: "the-mother",
    category: "Suspenseful Movies",
  },
];

const OUTPUT_DIR = path.join(__dirname, "../public/images/movies");

function ensureDirectoryExists(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
}

function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Skip data URIs
    if (url.startsWith("data:")) {
      console.log(`⏭️  Skipping data URI for ${path.basename(filepath)}`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filepath);

    https
      .get(url, (response) => {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            file.close();
            fs.unlinkSync(filepath);
            downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
            return;
          }
        }

        if (response.statusCode !== 200) {
          file.close();
          fs.unlinkSync(filepath);
          reject(new Error(`Failed to download: ${response.statusCode}`));
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log(`✅ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      })
      .on("error", (err) => {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        reject(err);
      });
  });
}

async function downloadAllImages(): Promise<void> {
  console.log("🎬 Netflix Movie Image Downloader");
  console.log("==================================\n");

  ensureDirectoryExists(OUTPUT_DIR);

  const results = {
    success: 0,
    skipped: 0,
    failed: 0,
  };

  for (const movie of movies) {
    const filename = `${movie.slug}.jpg`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Already exists: ${filename}`);
      results.skipped++;
      continue;
    }

    // Skip data URIs
    if (movie.imageUrl.startsWith("data:")) {
      console.log(`⏭️  Skipping data URI: ${movie.title}`);
      results.skipped++;
      continue;
    }

    try {
      await downloadImage(movie.imageUrl, filepath);
      results.success++;
      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`❌ Failed to download ${movie.title}:`, error);
      results.failed++;
    }
  }

  console.log("\n==================================");
  console.log("📊 Download Summary:");
  console.log(`   ✅ Success: ${results.success}`);
  console.log(`   ⏭️  Skipped: ${results.skipped}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   📁 Output: ${OUTPUT_DIR}`);
}

// Also export the movie data for use in the app
export function getMoviesData(): Movie[] {
  return movies;
}

// Generate a JSON file with movie data
function generateMovieDataJson(): void {
  const dataDir = path.join(__dirname, "../public/data");
  ensureDirectoryExists(dataDir);

  const moviesWithLocalImages = movies.map((movie) => ({
    ...movie,
    localImage: `/images/movies/${movie.slug}.jpg`,
  }));

  const categories = [
    {
      title: "Your Next Watch",
      slug: "your-next-watch",
      movies: moviesWithLocalImages.filter(
        (m) => m.category === "Your Next Watch"
      ),
    },
    {
      title: "Suspenseful Movies",
      slug: "suspenseful-movies",
      movies: moviesWithLocalImages.filter(
        (m) => m.category === "Suspenseful Movies"
      ),
    },
  ];

  const jsonPath = path.join(dataDir, "movies.json");
  fs.writeFileSync(jsonPath, JSON.stringify({ categories }, null, 2));
  console.log(`\n📄 Generated movie data: ${jsonPath}`);
}

// Run the script
downloadAllImages()
  .then(() => {
    generateMovieDataJson();
    console.log("\n🎉 Done!");
  })
  .catch(console.error);
