import React, {useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableContainer, TableHead, 
  TableRow, Paper, TablePagination, CircularProgress, 
  Collapse, TextField, Box } from "@mui/material"
import { apiTrakSatData, apiTrakSatHistory } from "../../../api/api_urls";
import { StyledTableCell } from "./StyledComponent"; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';

export default function TraksatList() {
  const [vesselsData, setVesselsData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null); 
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")
  const [historyData, setHistoryData] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false); // State for loading historical data

  useEffect(() => {
    const getTraksatHistory = async () => {
        try {
            const traksatHistoryResponse = await axios.get(apiTrakSatHistory);
            setLoadingHistory(false); // Set loading to false once data is fetched
            console.log('Traksat History', traksatHistoryResponse.data);
        } catch (error) {
            console.log(error);
            setLoadingHistory(false); // Make sure to set loading to false even if an error occurs
        }
    };

    getTraksatHistory();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vesselsResponse = await axios.get(apiTrakSatData);
        setVesselsData(vesselsResponse.data.success);
        console.log("apiTrakSatData", vesselsResponse.data.success);
        setLoading(false); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResult = vesselsData.filter(item =>
       item.asset_id.toLowerCase().includes(searchQuery.toLowerCase())  ||
       item.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.description.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setFilteredData(filteredResult)
  },[searchQuery, vesselsData])


  const handleRowClick =  async(asset_id,index) => {
    setExpandedRow(expandedRow === index ? null : index);
      try {
        setHistoryLoading(true);
        // Fetch historical data based on asset_id
        const response = await axios.get(`${apiTrakSatHistory}?asset_id=${asset_id}`);
        const limitedData = response.data.success.slice(0, 50);
        setHistoryData(limitedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setHistoryLoading(false); // Reset history loading state regardless of success or failure
      }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }


  return (
    <div className="pr-20">
      <h2 className="text-xl font-semibold pb-3">Traksat List</h2>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
   {loading ? ( // Show loading indicator if data is loading
        <CircularProgress />
      ) : (
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-800 ">
            <TableRow>
              <StyledTableCell ></StyledTableCell>
              <StyledTableCell><b className="text-white">Asset ID</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Description</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Group</b></StyledTableCell>
              <StyledTableCell><b className="text-white">GPS State</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Heading</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Last GPS GMT</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Last Report GMT</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Last Sat</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Last SMS</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Last Total</b></StyledTableCell>
              <StyledTableCell><b className="text-white">This Sat</b></StyledTableCell>
              <StyledTableCell><b className="text-white">This SMS</b></StyledTableCell>
              <StyledTableCell><b className="text-white">This Total</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Network</b></StyledTableCell>
              <StyledTableCell><b className="text-white">ODO</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Speed Kph</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
   <React.Fragment key={index}>
      
     <TableRow >
       <StyledTableCell onClick={() => handleRowClick(item.asset_id, index)} >
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
      </StyledTableCell>          
      <StyledTableCell>{item.asset_id ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.description ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.group ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.gps_state ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.heading ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.last_gps_gmt ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.last_report_gmt ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.last_sat ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.last_sms ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.last_total ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.this_sat ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.this_sms ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.this_total ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.network ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.odo ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.speed_kph ?? "--"}</StyledTableCell>
    </TableRow>
    <StyledTableCell  style={{ paddingBottom: 0, paddingTop: 0 }}   colSpan={6}>
                      <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
      {historyLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
    ) :  ( 
      <Box  sx={{ height:"600px", width:"58%", overflow:"auto" }}>
      <h2 className="font-lato text-[1rem] font-bold py-4">History</h2>
      {loadingHistory ? ( // Show loader if historyData is still loading
  <div className="flex items-center  font-lato text-[1rem]">
    Please wait it takes a while to fetch data...<CircularProgress />
  </div>
) : historyData && historyData.length > 0 ?  ( 

<Table>
<TableHead>
  <TableRow>
  <StyledTableCell><b>Asset ID</b></StyledTableCell>
    <StyledTableCell><b>Description</b></StyledTableCell>
    <StyledTableCell><b>Group</b></StyledTableCell>
    <StyledTableCell><b>GPS State</b></StyledTableCell>
    <StyledTableCell><b>Heading</b></StyledTableCell>
    <StyledTableCell><b>Last GPS GMT</b></StyledTableCell>
    <StyledTableCell><b>Last Report GMT</b></StyledTableCell>
    <StyledTableCell><b>Last Sat</b></StyledTableCell>
    <StyledTableCell><b>Last SMS</b></StyledTableCell>
    <StyledTableCell><b>Last Total</b></StyledTableCell>
    <StyledTableCell><b>This Sat</b></StyledTableCell>
    <StyledTableCell><b>This SMS</b></StyledTableCell>
    <StyledTableCell><b>This Total</b></StyledTableCell>
    <StyledTableCell><b>Network</b></StyledTableCell>
    <StyledTableCell><b>ODO</b></StyledTableCell>
    <StyledTableCell><b>Speed Kph</b></StyledTableCell>
  </TableRow>
</TableHead>
<TableBody>
{historyData.map((item, index) => (
    <TableRow key={index}>
      <StyledTableCell>{item.asset_id ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.description ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.group ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.gps_state ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.heading ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.last_gps_gmt ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.last_report_gmt ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.last_sat ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.last_sms ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.last_total ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.this_sat ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.this_sms ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.this_total ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.network ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.odo ?? "--"}</StyledTableCell>
      <StyledTableCell>{item.speed_kph ?? "--"}</StyledTableCell>
    </TableRow>
   ))}
</TableBody>
</Table>
) : (
  <div>No history to show.</div>
)}
    </Box>
    )}           
                       
                      </Collapse>
                    </StyledTableCell>
    
    
   </React.Fragment>
  ))}
</TableBody>
        </Table>
      </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
