import html2pdf from 'html2pdf.js'
import type { Ticket } from '@/common/types/ticket.types'

export interface TicketPdfData {
  ticket: Ticket
  eventDate?: string
  placeTitle?: string
  placeAddress?: string
}

export const exportTicketPdf = async (data?: TicketPdfData): Promise<void> => {
  const ticketKey = data?.ticket?.keyPass || 'Digital'

  const targetElement = document.querySelector('.ticket__container') as HTMLElement | null

  if (!targetElement) {
    console.warn('Could not find .ticket__container in DOM')
    return
  }

  const images = Array.from(targetElement.querySelectorAll('img'))
  await Promise.all(
    images.map(img => {
      if (img.complete) return Promise.resolve()
      return new Promise(resolve => {
        img.onload = resolve
        img.onerror = resolve
        setTimeout(resolve, 600)
      })
    })
  )

  const originalWidth = targetElement.style.width
  const originalMargin = targetElement.style.margin
  const originalTransform = targetElement.style.transform
  const originalTransformOrigin = targetElement.style.transformOrigin

  targetElement.style.width = '480px'
  targetElement.style.margin = '0 auto'
  targetElement.style.transform = 'scale(0.82)'
  targetElement.style.transformOrigin = 'top center'

  const downloadBox = targetElement.querySelector('.ticket__download-box') as HTMLElement | null
  if (downloadBox) {
    downloadBox.style.display = 'none'
  }

  const opt = {
    margin: [20, 51, 20, 51],
    filename: `Boleto_${ticketKey}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      scrollY: -window.scrollY
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }

  try {
    // @ts-expect-error html2pdf does not export official ts types
    await html2pdf().set(opt).from(targetElement).save()
  } catch (err) {
    console.error('Error generating ticket PDF:', err)
  } finally {
    targetElement.style.width = originalWidth
    targetElement.style.margin = originalMargin
    targetElement.style.transform = originalTransform
    targetElement.style.transformOrigin = originalTransformOrigin
    if (downloadBox) {
      downloadBox.style.display = ''
    }
  }
}
