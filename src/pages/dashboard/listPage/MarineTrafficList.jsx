import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableContainer, TableHead, 
         TableRow, Paper, TablePagination, CircularProgress, 
         Collapse, TextField, Box } from "@mui/material";
import { apiMarineTrafficData } from "../../../api/api_urls";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import { StyledTableCell } from "./StyledComponent";
import MarineTrafficHistory from './history/MarineTrafficHistory'


export default function MarineTrafficList() {
  const [vesselsData, setVesselsData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null); // State to manage expanded row
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")

  const historyData =  MarineTrafficHistory()
  console.log('MarineTraffic History Data', historyData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vesselsResponse = await axios.get(apiMarineTrafficData);
        setVesselsData(vesselsResponse.data.success);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const filteredResult = vesselsData.filter(item =>
       item.ship_id.toLowerCase().includes(searchQuery.toLowerCase())  ||
       item.shipname.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.shiptype.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setFilteredData(filteredResult)
  },[searchQuery, vesselsData])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="pr-20 font-lato">
      <h2 className="text-xl font-semibold pb-3">Marine Traffic List</h2>
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
                <StyledTableCell colSpan={2}><b className="text-white">Ship ID</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">Ship Name</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">Ship Type</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">Ais Type Summary</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">Type Name</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">Callsign</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">Current Port</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">Destination</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">Speed</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">Draught</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">Course</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">IMO</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">DWT</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">MMSI</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">GRT</b></StyledTableCell>
                <StyledTableCell colSpan={2}><b className="text-white">Year Built</b></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <React.Fragment key={index}>
                 <TableRow >
                  <StyledTableCell onClick={() => handleRowClick(index)} >
                   <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                  </StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.ship_id ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.shipname ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.shiptype ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.ais_type_summary ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.type_name ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.callsign ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.current_port ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.destination ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.speed ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.draught ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.course ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.imo ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.dwt ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.mmsi ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.grt ?? "--"}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{item.year_built ?? "--"}</StyledTableCell>
                  </TableRow>
              
                    <StyledTableCell  style={{ paddingBottom: 0, paddingTop: 0 }}   colSpan={6}>
                      <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                          <Box  sx={{ height:"600px", width:"58%", overflow:"auto" }}>
                            <h2 className="font-lato text-[1rem] font-bold py-4">History</h2>
                            <Table>
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell><b>Ship ID</b></StyledTableCell>
                                    <StyledTableCell><b>Ship name</b></StyledTableCell>
                                    <StyledTableCell><b>Ship Type</b></StyledTableCell>
                                    <StyledTableCell><b>Ais Type Summary</b></StyledTableCell>
                                    <StyledTableCell><b>Type Name</b></StyledTableCell>
                                    <StyledTableCell><b>Callsign</b></StyledTableCell>
                                    <StyledTableCell><b>Current Port</b></StyledTableCell>
                                    <StyledTableCell><b>Destination</b></StyledTableCell>
                                    <StyledTableCell><b>Speed</b></StyledTableCell>
                                    <StyledTableCell><b>Draught</b></StyledTableCell>
                                    <StyledTableCell><b>Course</b></StyledTableCell>
                                    <StyledTableCell><b>IMO</b></StyledTableCell>
                                    <StyledTableCell><b>DWT</b></StyledTableCell>
                                    <StyledTableCell><b>MMSI</b></StyledTableCell>
                                    <StyledTableCell><b>GRT</b></StyledTableCell>
                                    <StyledTableCell><b>Year Built</b></StyledTableCell>
                                  </TableRow>
                                </TableHead>
                              <TableBody>
                                  {historyData.filter(historyItem => item.mmsi === historyItem.mmsi).slice(0,10).map((historyItem, historyIndex) => (
                                    // Check if historyItem's MMSI matches the current item's MMSI
                                    item.mmsi === historyItem.mmsi &&
                                    <TableRow key={historyIndex}>
                                      <StyledTableCell>{historyItem.ship_id ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.shipname ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.shiptype ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.ais_type_summary ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.type_name ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.callsign ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.current_port ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.destination ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.speed ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.draught ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.course ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.imo ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.dwt ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.mmsi ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.grt ?? "--"}</StyledTableCell>
                                      <StyledTableCell>{historyItem.year_built ?? "--"}</StyledTableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                          </Box>
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
