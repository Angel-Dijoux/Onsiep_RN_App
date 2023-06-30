import * as cheerio from 'cheerio';

export type formattedHtml = Array<{ type: string; attendus: string[] }>

export function transformHTMLData(htmlData) {
    const $ = cheerio.load(htmlData);
    const competencies: formattedHtml = [];
    const typesOfInterest = [
        'COMPETENCES GENERALES',
        'COMPETENCES TECHNIQUES ET SCIENTIFIQUES',
        'QUALITES HUMAINES',
        // Add more types of interest here
    ];

    let currentType = '';
    let currentExpectations: string[] = [];

    $('p, ul li').each((index, element) => {
        const tagName = element.tagName;

        if (tagName === 'p') {
            const text = $(element).text().trim();
            if (typesOfInterest.includes(text)) {
                if (currentType && currentExpectations.length > 0) {
                    competencies.push({
                        type: currentType,
                        attendus: currentExpectations,
                    });
                }
                currentType = text;
                currentExpectations = [];
            }
        } else if (tagName === 'li') {
            const text = $(element).text().trim();
            if (text) {
                currentExpectations.push(text);
            }
        }
    });

    if (currentType && currentExpectations.length > 0) {
        competencies.push({
            type: currentType,
            attendus: currentExpectations,
        });
    }

    return competencies;
}
