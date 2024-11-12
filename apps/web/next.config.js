/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.locknlock.com',
                pathname: '**'
            }
        ]
    }

}

module.exports = nextConfig
