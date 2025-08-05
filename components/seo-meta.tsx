import Head from 'next/head'

interface SeoMetaProps {
    title: string
    description: string
    keywords?: string[]
    ogImage?: string
    canonicalUrl?: string
}

export function SeoMeta({
    title,
    description,
    keywords = [],
    ogImage,
    canonicalUrl,
}: SeoMetaProps) {
    const siteName = 'Tutorium'
    const fullTitle = `${title} | ${siteName}`

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(', ')} />
            )}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteName} />
            {ogImage && <meta property="og:image" content={ogImage} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}

            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}
