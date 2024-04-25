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
  const { marineTrafficData } = useContext(DataContext);
  const [exportOptionsVisible, setExportOptionsVisible] = useState(false);

  const generateXLSXData = () => {
    const worksheet = XLSX.utils.json_to_sheet(generateCSVData());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'marineTraffic Data');
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
    const csvData = marineTrafficData.map(item => ({
      ShipID: item?.ship_id || "N/A" ,
      ShipName: item?.shipname || "N/A",
      ShipType: item?.shiptype  || "N/A",
      AisTypeSummary: item?.ais_type_summary || "N/A",
      TypeName: item?.type_name || "N/A",
      Callsign: item?.callsign || "N/A",
      CurrentPort: item?.current_port || "N/A",
      Destination: item?.destination || "N/A",
      Speed: item?.speed || "N/A",
      Draught: item?.draught || "N/A",
      Course: item?.course || "N/A",
      IMO: item?.imo || "N/A",
      DWT: item?.dwt || "N/A",
      MMSI: item?.mmsi  || "N/A",
      GRT: item?.grt || "N/A",
      YearBuilt: item?.year_built || "N/A",
    }));
    return csvData;
  };

  const generatePDFData = () => (
    <Document>
      <Page size="A4" style={styles.page} orientation='landscape'>
        <View style={styles.section}>
          <View style={styles.headerBox}>
            <Image src={logo} style={styles.headerLogo} />
          <Text style={styles.headerText}>MarineTraffic List </Text>
          </View>

          <View  style={styles.tableRow}>
            <Text style={styles.tableCellTitle}>Ship ID</Text>
            <Text style={styles.tableCellTitle}>Ship Name</Text>
            <Text style={styles.tableCellTitle}>Ship Type</Text>
            <Text style={styles.tableCellTitle}>Ais Type Summary</Text>
            <Text style={styles.tableCellTitle}>Type Name</Text>
            <Text style={styles.tableCellTitle}>Callsign</Text>
            <Text style={styles.tableCellTitle}>Current Port</Text>
            <Text style={styles.tableCellTitle}>Destination</Text>
            <Text style={styles.tableCellTitle}>Speed</Text>
            <Text style={styles.tableCellTitle}>Draught</Text>
            <Text style={styles.tableCellTitle}>Course</Text>
            <Text style={styles.tableCellTitle}>IMO</Text>
            <Text style={styles.tableCellTitle}>DWT</Text>
            <Text style={styles.tableCellTitle}>MMSI</Text>
            <Text style={styles.tableCellTitle}>GRT</Text>
            <Text style={styles.tableCellTitle}>Year Built</Text>
       
            </View>

          {marineTrafficData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item?.ship_id  || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.shipname || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.shiptype || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.ais_type_summary || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.type_name || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.callsign || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.current_port || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.destination || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.speed || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.draught || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.course || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.imo || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.dwt || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.mmsi  || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.grt || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.year_built  || "N/A"}</Text>
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
<div className=''>
{exportOptionsVisible && (
        <div className='flex flex-col -mt-60 absolute z-20  bg-white m-2 shadow-md rounded-md '>
          <CsvDownloader
            filename="marineTraffic.csv"
            separator=","
            datas={generateCSVData()}
            wrapColumnChar={'"'}
          >
            <button className='p-2 w-[130px]'>Export as CSV</button>
          </CsvDownloader>
          
          <PDFDownloadLink document={generatePDFData()} fileName="marineTraffic.pdf">
            <button className='p-2 w-[130px]'>Export as PDF</button>
          </PDFDownloadLink>

          <button className='p-2 w-[130px]' onClick={() => {
                const xlsxData = generateXLSXData();
                const blob = new Blob([xlsxData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'marineTraffic.xlsx';
                a.click();
                URL.revokeObjectURL(url);
              }}>Export as XLSX
            </button>

        </div>
      )}
     <button className=' font-manrope bg-[#0DB0E6] text-white flex items-center   px-2 p-1 mb-3 rounded-md  ml-5
       text-sm gap-2' onClick={toggleExportOptions}>
        <GoDownload /> Export 
      </button>
      
    
</div>
  );
}
