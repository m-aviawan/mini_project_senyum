/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.locknlock.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'i0.wp.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'assets.loket.com',
                pathname: '**'
            },
        ]
    }

}

module.exports = nextConfig
