export default function tableOfContents(htmlContent: string){
	const toc = [];
	const regex = /<(h[1-6])[^>]*>(.*?)<\/\1>/g;
	let match;
	
	while ((match = regex.exec(htmlContent)) !== null) {
	    const tagName = match[1];
	    const innerHTML = match[2];
	    const textMatch = innerHTML.match(/>([^<]+)</);
	    const anchorMatch = innerHTML.match(/id="([^"]+)"/) || innerHTML.match(/href="#([^"]+)"/);
	    
	    if (textMatch && anchorMatch) {
		const text = textMatch[1];
		const id = anchorMatch[1];
		toc.push({
		    level: tagName,
		    text: text,
		    id: id
		});
	    }
	}
	
	return toc;
	    
}