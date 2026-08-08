/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep builds strict — do not paper over type/lint errors.
  // If a future dependency causes type noise, prefer fixing types or
  // skipLibCheck (already true in tsconfig) over ignoreBuildErrors.
};

export default nextConfig;
