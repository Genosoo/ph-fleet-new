/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import CsvDownloader from 'react-csv-downloader';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image, Font} from '@react-pdf/renderer';
import { DataContext } from '../../../../context/DataProvider';
import { GoDownload } from "react-icons/go";
import * as XLSX from 'xlsx';
import logo from '../../../../assets/logo.png'


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 5,
  },
  section: {
    margin: 5,
    flexGrow: 1,
  },
  headerBox: {
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    paddingBottom:20,

  },

  headerLogo:{
    width:50,
    height:50,
    marginRight:10
  },

  headerText: {
    fontSize: 12,
    fontWeight:"ultrabold",
    textAlign: 'center',
    marginTop:10,
    textTransform:"uppercase"
  },
  title: {
    fontSize:12,
    fontWeight: 800,
    marginBottom: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,

  },
  tableCellTitle: {
    flex: 1,
    padding: 5,
    fontSize:8,
    backgroundColor:"#3b3b3b",
    fontWeight:"semibold",
    color:"#fff"
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize:8,

  },
});

export default function ExportFiles() {
  const { vesselsData } = useContext(DataContext);
  const [exportOptionsVisible, setExportOptionsVisible] = useState(false);

  const generateXLSXData = () => {
    const worksheet = XLSX.utils.json_to_sheet(generateCSVData());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vessels Data');
    const xlsxBuffer = XLSX.write(workbook, { type: 'buffer' });
    return xlsxBuffer;
  };
  

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

  const generateCSVData = () => {
    const csvData = vesselsData.map(item => ({
      HullNumber: item?.hull_number || "N/A" ,
      Name: item?.vessel_name || "N/A",
      ClassName: item?.vessel_class_details?.class_name || "N/A",
      Type: item?.vessel_type_details?.type_name || "N/A",
      Unit: item?.unit_details?.unit_name || "N/A",
      Origin: item?.origin || "N/A",
      Capacity: item?.capacity || "N/A",
    }));
    return csvData;
  };

  const generatePDFData = () => (
    <Document>
      <Page size="A4" style={styles.page} orientation='landscape'>
        <View style={styles.section}>
          <View style={styles.headerBox}>
            <Image src={logo} style={styles.headerLogo} />
          <Text style={styles.headerText}>Vessels List </Text>
          </View>

          <View  style={styles.tableRow}>
            <Text style={styles.tableCellTitle}>Hull Number</Text>
            <Text style={styles.tableCellTitle}>Name</Text>
            <Text style={styles.tableCellTitle}>Class Name</Text>
            <Text style={styles.tableCellTitle}>Type</Text>
            <Text style={styles.tableCellTitle}>Unit</Text>
            <Text style={styles.tableCellTitle}>Origin</Text>
            <Text style={styles.tableCellTitle}>Capacity</Text>
            </View>

          {vesselsData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item?.hull_number || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.vessel_name || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.vessel_class_details?.class_name || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.vessel_type_details?.type_name || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.unit_details?.unit_name || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.origin || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.capacity || "N/A"}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );


  const toggleExportOptions = () => {
    setExportOptionsVisible(!exportOptionsVisible);
  };
  

  return (
<div className= 'absolute'>
{exportOptionsVisible && (
        <div className='btnExportBox'>
          <CsvDownloader
            filename="Vessels.csv"
            separator=","
            datas={generateCSVData()}
            wrapColumnChar={'"'}
          >
            <button>Export as CSV</button>
          </CsvDownloader>
          
          <PDFDownloadLink document={generatePDFData()} fileName="Vessels.pdf">
            <button>Export as PDF</button>
          </PDFDownloadLink>

          <button onClick={() => {
                const xlsxData = generateXLSXData();
                const blob = new Blob([xlsxData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Vessels.xlsx';
                a.click();
                URL.revokeObjectURL(url);
              }}>Export as XLSX
            </button>

        </div>
      )}
     <button className='btnExport' onClick={toggleExportOptions}>
        <GoDownload /> Export 
      </button>
      
    
</div>
  );
}
