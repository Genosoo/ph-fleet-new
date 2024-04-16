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
    boxTitle:{
        flexDirection:"row",
    },


    boxTitleText:{
        borderBottomWidth:1,
        borderBottomColor:"#000",
        fontSize:12,
        padding:10
    },
    boxDetailWrapper:{
        flexDirection:"row"
    },
    boxDetail: {
        backgroundColor: '#e8e8e8', 
        paddingLeft:10,
        paddingVertical:10,
    },

    boxDetailText: {
        fontSize:10
    }
});

export default function ExportFiles() {
  const { incidentData } = useContext(DataContext);
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
        <View style={styles.headerBox}>
            <Text style={styles.headerText}>Personnel Records</Text>
        </View>

        {/* <View style={styles.boxContainer}>
            <View style={styles.boxTitle}>
                <Text style={styles.boxTitleText}>Date/Time</Text>
                <Text style={styles.boxTitleText}>Description</Text>
            </View>

            <View style={styles.boxDetailWrapper}>
            <View style={styles.boxDetail}>
            {incidentData.map((item, index) => (
                <Text  key={index} style={styles.boxDetailText}>
                    {item.created_at ? formatDate(item.created_at) : "N/A" }
                </Text>
            ))}
            </View>

            <View style={styles.boxDetail}>
          
            {incidentData.map((item, index) => (
                <Text  key={index} style={styles.boxDetailText}>
                    {item.incident_details || "N/A"}
                </Text>
            ))}
            </View>
            </View>
        </View> */}
       

           {/* <View style={[styles.boxDetail]}>
              {incidentData.map((item, index) => (
                <Text style={[styles.boxDetailText]} key={index}>
              {item.incident_details || "N/A"}
            </Text>
          ))}
           </View> */}

      
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
            filename="personnelRecords.csv"
            separator=","
            datas={generateCSVData()}
            wrapColumnChar={'"'}
          >
            <button>Export as CSV</button>
          </CsvDownloader>
          
          <PDFDownloadLink document={generatePDFData()} fileName="personnelRecords.pdf">
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
