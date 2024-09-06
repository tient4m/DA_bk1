package com.project.shopapp.Exproter;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.project.shopapp.dtos.InvoiceDTO;
import com.project.shopapp.models.Product;
import lombok.*;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletResponse;
import java.awt.Color;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
@Getter
@Setter
public class InvoicePDFExporter {
    private List<InvoiceDTO> invoiceDTOS;

    public InvoicePDFExporter(List<InvoiceDTO> invoiceDTOS) {
        this.invoiceDTOS = invoiceDTOS;
    }

    public void export(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        // Sử dụng font nhúng hỗ trợ tiếng Việt
        String fontPath = "/fonts/DejaVuSans.ttf"; // Đường dẫn tới font trong resources
        BaseFont baseFont = BaseFont.createFont(getClass().getResource(fontPath).toString(), BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
        Font font = new Font(baseFont, 12, Font.NORMAL);

        // Thêm tiêu đề hóa đơn
        Paragraph title = new Paragraph("Hoá đơn mua bán nhà sách Trí Tuệ", font);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);

        // Thêm bảng
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100f);
        table.setWidths(new float[]{1.0f, 3.5f, 1.5f, 2.0f});
        table.setSpacingBefore(10);

        // Viết tiêu đề bảng với font hỗ trợ tiếng Việt
        writeTableHeader(table, font);
        writeTableData(table, font);

        document.add(table);
        document.close();
    }

    private void writeTableHeader(PdfPTable table, Font font) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(5);

        cell.setPhrase(new Phrase("STT", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Tên sản phẩm", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Số lượng", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Thành tiền", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table, Font font) {
        int stt = 1;
        for (InvoiceDTO item : invoiceDTOS) {
            table.addCell(new Phrase(String.valueOf(stt++), font));
            table.addCell(new Phrase(item.getProductName(), font));
            table.addCell(new Phrase(String.valueOf(item.getQuantity()), font));
            table.addCell(new Phrase(String.valueOf(item.getQuantity() * item.getPrice()), font));
        }
    }
}