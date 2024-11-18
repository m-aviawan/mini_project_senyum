/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i0.wp.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**'
            },
            {
                
                hostname: 'assets.loket.com',
                pathname: '**'
            
            },
        ]
    }

}

module.exports = nextConfig
