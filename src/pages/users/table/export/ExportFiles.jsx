/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import CsvDownloader from 'react-csv-downloader';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { DataContext } from '../../../../context/DataProvider';
import { GoDownload } from "react-icons/go";


const styles = StyleSheet.create({

    headerBox :{
        alignContent:"center",
        alignItems:"center",
        display:"flex",
        padding:10,
    },

    boxContainer:{
      gap:5,
      padding:10
    },

    boxTitle:{
        flexDirection:"row",
    },


    boxTitleText:{
        borderBottomWidth:1,
        borderBottomColor:"#000",
        fontSize:12,
        padding:10,
        width:200,

    },
    boxDetailWrapper:{
        flexDirection:"row",
      gap:5


    },
    boxDetail: {
        backgroundColor: '#e8e8e8', 
        width:150,

        
    },

    boxDetailText: {
        fontSize:10
    }
});

export default function ExportFiles() {
  const { usersData } = useContext(DataContext);
  const [exportOptionsVisible, setExportOptionsVisible] = useState(false);

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
    const csvData = usersData.map(item => ({
      DateTime: item?.personal_details?.created_at ? formatDate(item.created_at) : "N/A",
      username: item?.username || "N/A",
      firstname: item?.first_name || "N/A",
      lastname: item?.last_name || "N/A",
      email: item?.email || "N/A",
      role: item?.roles[0] || "N/A",
      reporterAddress: item?.address_reported || "N/A",
      Status: item?.personal_details?.status_name || "N/A",
    }));
    return csvData;
  };

  const generatePDFData = () => (
    <Document>
    <Page size="A4" style={styles.page} orientation='landscape'>
        <View style={styles.headerBox}>
            <Text style={styles.headerText}>Users Records</Text>
        </View>

        <View style={styles.boxContainer}>
            <View style={styles.boxTitle}>
                <Text style={styles.boxTitleText}>Date/Time</Text>
                <Text style={styles.boxTitleText}>Username</Text>
            </View>

            <View style={styles.boxDetailWrapper}>
            <View style={styles.boxDetail}>
            {usersData.map((item, index) => (
                <Text  key={index} style={styles.boxDetailText}>
                    {item?.personal_details?.created_at ? formatDate(item?.personal_details?.created_at) : "N/A" }
                </Text>
            ))}
            </View>

            <View style={styles.boxDetail}>
          
            {usersData.map((item, index) => (
                <Text  key={index} style={styles.boxDetailText}>
                    {item.username || "N/A"}
                </Text>
            ))}
            </View>
            </View>
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
            filename="usersRecords.csv"
            separator=","
            datas={generateCSVData()}
            wrapColumnChar={'"'}
          >
            <button>Export as CSV</button>
          </CsvDownloader>
          
          <PDFDownloadLink document={generatePDFData()} fileName="usersRecords.pdf">
            <button>Export as PDF</button>
          </PDFDownloadLink>
        </div>
      )}
     <button className='btnExport' onClick={toggleExportOptions}>
        <GoDownload /> Export 
      </button>
      
    
</div>
  );
}
