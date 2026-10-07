import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const assetsDir = path.resolve("src/assets");
const files = fs.readdirSync(assetsDir).filter((file) => file.endsWith(".asset.json"));

console.log(`Encontrados ${files.length} arquivos de metadata (.asset.json)...`);

async function downloadAsset(filename) {
  const metaPath = path.join(assetsDir, filename);
  const metadata = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  const targetPath = path.join(assetsDir, metadata.original_filename);

  const downloadUrl = `https://id-preview--${metadata.project_id}.lovable.app${metadata.url}`;

  return new Promise((resolve, reject) => {
    https
      .get(downloadUrl, (res) => {
        if (res.statusCode !== 200) {
          reject(
            new Error(`Falha ao baixar ${metadata.original_filename}: status ${res.statusCode}`),
          );
          return;
        }

        const fileStream = fs.createWriteStream(targetPath);
        res.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          const sizeKb = (fs.statSync(targetPath).size / 1024).toFixed(1);
          console.log(`✓ Baixado: ${metadata.original_filename} (${sizeKb} KB)`);
          resolve();
        });

        fileStream.on("error", reject);
      })
      .on("error", reject);
  });
}

for (const file of files) {
  await downloadAsset(file);
}

console.log("Download de todos os assets concluído com sucesso!");
