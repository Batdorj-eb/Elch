// lib/utils.ts

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Simple format that works on both server and client
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Mongolian month names
  const monthNames = [
    'нэгдүгээр сар',
    'хоёрдугаар сар',
    'гуравдугаар сар',
    'дөрөвдүгээр сар',
    'тавдугаар сар',
    'зургаадугаар сар',
    'долоодугаар сар',
    'наймдугаар сар',
    'есдүгээр сар',
    'аравдугаар сар',
    'арван нэгдүгээр сар',
    'арван хоёрдугаар сар'
  ];
  
  return `${year} оны ${monthNames[date.getMonth()]} ${day}`;
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}.${month}.${day}`;
}


// lib/utils.ts

// lib/utils.ts

export function processVideoContent(html: string): string {
  if (!html) return '';
  
  // 🔥 DEBUG: Эхний агуулгыг харах
  console.log('Original HTML:', html);
  
  let processed = html;

  // ✅ Pattern 1: <figure class="media"> wrapper-тай
  processed = processed.replace(
    /<figure[^>]*class="media"[^>]*>\s*<oembed\s+url="https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^"&]+)[^"]*"><\/oembed>\s*<\/figure>/gi,
    `<div class="relative w-full aspect-video my-6 md:my-8 rounded-lg overflow-hidden border border-neutral-200">
      <iframe
        src="https://www.youtube.com/embed/$1"
        class="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        title="YouTube video"
      ></iframe>
    </div>`
  );

  // ✅ Pattern 2: youtu.be format (figure-тай)
  processed = processed.replace(
    /<figure[^>]*class="media"[^>]*>\s*<oembed\s+url="https?:\/\/youtu\.be\/([^"?]+)[^"]*"><\/oembed>\s*<\/figure>/gi,
    `<div class="relative w-full aspect-video my-6 md:my-8 rounded-lg overflow-hidden border border-neutral-200">
      <iframe
        src="https://www.youtube.com/embed/$1"
        class="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        title="YouTube video"
      ></iframe>
    </div>`
  );

  // ✅ Pattern 3: Fallback - figure-гүй бол (ямар ч тохиолдолд)
  processed = processed.replace(
    /<oembed\s+url="https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^"&]+)[^"]*"><\/oembed>/gi,
    `<div class="relative w-full aspect-video my-6 md:my-8 rounded-lg overflow-hidden border border-neutral-200">
      <iframe
        src="https://www.youtube.com/embed/$1"
        class="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        title="YouTube video"
      ></iframe>
    </div>`
  );

  processed = processed.replace(
    /<oembed\s+url="https?:\/\/youtu\.be\/([^"?]+)[^"]*"><\/oembed>/gi,
    `<div class="relative w-full aspect-video my-6 md:my-8 rounded-lg overflow-hidden border border-neutral-200">
      <iframe
        src="https://www.youtube.com/embed/$1"
        class="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        title="YouTube video"
      ></iframe>
    </div>`
  );

  // 🔥 DEBUG: Processed агуулгыг харах
  console.log('Processed HTML:', processed);
  
  return processed;
}