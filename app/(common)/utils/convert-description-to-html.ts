export function convertDescriptionToHtml(description: any): string {
   if (!description) {
      return '';
   }

   description = JSON.parse(description);
   let html = '';

   description.blocks?.forEach((block: any) => {
      if (block.type === 'paragraph') {
         html += `<p>${block.data.text}</p>`;
      }
   });

   return html;
}
