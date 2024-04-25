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
  const { incidentData } = useContext(DataContext);
  const [exportOptionsVisible, setExportOptionsVisible] = useState(false);

  const generateXLSXData = () => {
    const worksheet = XLSX.utils.json_to_sheet(generateCSVData());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Incident Data');
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
    const csvData = incidentData.map(item => ({
      DateTime: item.created_at ? formatDate(item.created_at) : "N/A",
      Description: item?.incident_details || "N/A",
      Severity: item?.severity_details.severity_name || "N/A",
      Type: item?.type_details?.type_name || "N/A",
      Reporter: item?.user_details?.username || "N/A",
      incidentAddress: item?.address_incident || "N/A",
      reporterAddress: item?.address_reported || "N/A",
      Status: item?.status_details?.type_status || "N/A",
      AssignedResponder: item?.user_assigned_to_details?.username || "No Assigned Responder"
    }));
    return csvData;
  };

  const generatePDFData = () => (
    <Document>
      <Page size="A4" style={styles.page} orientation='landscape'>
        <View style={styles.section}>
          <View style={styles.headerBox}>
            <Image src={logo} style={styles.headerLogo} />
          <Text style={styles.headerText}>Incidents List </Text>
          </View>

          <View  style={styles.tableRow}>
            <Text style={styles.tableCellTitle}>Date/Time</Text>
            <Text style={styles.tableCellTitle}>Incident Details</Text>
            <Text style={styles.tableCellTitle}>Severity</Text>
            <Text style={styles.tableCellTitle}>Type</Text>
            <Text style={styles.tableCellTitle}>Reporter</Text>
            <Text style={styles.tableCellTitle}>Incident Address</Text>
            <Text style={styles.tableCellTitle}>Reporter Address</Text>
            <Text style={styles.tableCellTitle}>Status</Text>
            <Text style={styles.tableCellTitle}>Assigned Responder</Text>
            </View>

          {incidentData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.created_at ? formatDate(item.created_at) : "N/A"}</Text>
              <Text style={styles.tableCell}>{item.incident_details || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.severity_details?.severity_name || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.type_details?.type_name || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.user_details?.username || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.address_incident || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.address_reported || "N/A"}</Text>
              <Text style={styles.tableCell}>{item.status_details?.type_status || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.user_assigned_to_details?.username || "No Assigned Responder"}</Text>
              
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
            filename="Incidents.csv"
            separator=","
            datas={generateCSVData()}
            wrapColumnChar={'"'}
          >
            <button>Export as CSV</button>
          </CsvDownloader>
          
          <PDFDownloadLink document={generatePDFData()} fileName="Incidents.pdf">
            <button>Export as PDF</button>
          </PDFDownloadLink>

          <button onClick={() => {
                const xlsxData = generateXLSXData();
                const blob = new Blob([xlsxData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Incidents.xlsx';
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
