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