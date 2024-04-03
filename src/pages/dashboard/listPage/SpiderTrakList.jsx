import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiSpiderTrakHistory } from "../../../api/api_urls";
import { Table, TableBody, TableContainer, TableHead, 
  TableRow, Paper, TablePagination, CircularProgress, 
  Collapse, TextField, Box } from "@mui/material"
import { StyledTableCell } from "./StyledComponent";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import { useFetchData } from "../../../context/FetchData";


export default function SpiderTrakList() {
  const [filteredData, setFilteredData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("")
  const [historyData, setHistoryData] = useState([])


  const fetchedData = useFetchData();
  
  const spiderTrakData = fetchedData.spiderTrakData

  useEffect(() => {
    if (fetchedData !== null) {
      setLoading(false); 
    }
  }, [fetchedData]);


  useEffect(() => {
    const filteredResult = spiderTrakData.filter(item =>
       item.unit_id.toLowerCase().includes(searchQuery.toLowerCase())  ||
       item.track_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.esn.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setFilteredData(filteredResult)
  },[searchQuery, spiderTrakData])


  const handleRowClick =  async(unit_id,index) => {
    setExpandedRow(expandedRow === index ? null : index);
      try {
        setLoadingHistory(true);
        // Fetch historical data based on unit_id
        const response = await axios.get(`${apiSpiderTrakHistory}?unit_id=${unit_id}`);
        const limitedData = response.data.success.slice(0, 50);
        setHistoryData(limitedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setLoadingHistory(false); // Reset history loading state regardless of success or failure
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
      <h2 className="text-xl font-semibold pb-3">Spider Trak List</h2>
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
              <StyledTableCell><b className="text-white">Unit ID</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Track ID</b></StyledTableCell>
              <StyledTableCell><b className="text-white">SRC</b></StyledTableCell>
              <StyledTableCell><b className="text-white">ESN</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Altitude</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Speed</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Fix</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Cog</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Hdop</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
        <React.Fragment key={index}>
          <TableRow key={index}>
            <StyledTableCell onClick={() => handleRowClick(item.unit_id, index)} >
                <IconButton aria-label="expand row" size="small">
                  {expandedRow === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </StyledTableCell>   
            <StyledTableCell>{item.unit_id ?? "--"}</StyledTableCell>
            <StyledTableCell>{item.track_id ?? "--"}</StyledTableCell>
            <StyledTableCell>{item.src ?? "--"}</StyledTableCell>
            <StyledTableCell>{item.esn ?? "--"}</StyledTableCell>
            <StyledTableCell>{item.altitude ?? "--"}</StyledTableCell>
            <StyledTableCell>{item.spd ?? "--"}</StyledTableCell>
            <StyledTableCell>{item.fix ?? "--"}</StyledTableCell>
            <StyledTableCell>{item.cog ?? "--"}</StyledTableCell>
            <StyledTableCell>{item.hdop ?? "--"}</StyledTableCell>
          </TableRow>
          <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
    <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
    {loadingHistory ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
      <CircularProgress />
    </Box>
  ) : (
    historyData && historyData.length > 0 ? (
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell><b>Unit ID</b></StyledTableCell>
            <StyledTableCell><b>Track ID</b></StyledTableCell>
            <StyledTableCell><b>SRC</b></StyledTableCell>
            <StyledTableCell><b>ESN</b></StyledTableCell>
            <StyledTableCell><b>Altitude</b></StyledTableCell>
            <StyledTableCell><b>Speed</b></StyledTableCell>
            <StyledTableCell><b>Fix</b></StyledTableCell>
            <StyledTableCell><b>Cog</b></StyledTableCell>
            <StyledTableCell><b>Hdop</b></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historyData.map((historyItem, index) => (
            <TableRow key={index}>
              <StyledTableCell>{historyItem.unit_id ?? "--"}</StyledTableCell>
              <StyledTableCell>{historyItem.track_id ?? "--"}</StyledTableCell>
              <StyledTableCell>{historyItem.src ?? "--"}</StyledTableCell>
              <StyledTableCell>{historyItem.esn ?? "--"}</StyledTableCell>
              <StyledTableCell>{historyItem.altitude ?? "--"}</StyledTableCell>
              <StyledTableCell>{historyItem.spd ?? "--"}</StyledTableCell>
              <StyledTableCell>{historyItem.fix ?? "--"}</StyledTableCell>
              <StyledTableCell>{historyItem.cog ?? "--"}</StyledTableCell>
              <StyledTableCell>{historyItem.hdop ?? "--"}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      <div>No history to show.</div>
    )
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
