import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiSpiderTrakData, apiSpiderTrakHistory } from "../../../api/api_urls";
import { Table, TableBody, TableContainer, TableHead, 
  TableRow, Paper, TablePagination, CircularProgress, 
  Collapse, TextField, Box } from "@mui/material"
import { StyledTableCell } from "./StyledComponent";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';


export default function SpiderTrakList() {
  const [spideTrakData, setSpiderTrakData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null); 
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")
  const [spiderTrakHistory, setSpiderTrakHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spiderTrakResponse = await axios.get(apiSpiderTrakData);

        setSpiderTrakData(spiderTrakResponse.data.success);
        console.log("apiSpiderTrakData", spiderTrakResponse.data);
        setLoading(false); 
      } catch (error) {
        console.log(error);
      }
    };

    const getSpiderTrakHistory = async () => {
      try {
          const spiderTrakHistoryResponse = await axios.get(apiSpiderTrakHistory);
          setSpiderTrakHistory(spiderTrakHistoryResponse.data.success);
          setLoadingHistory(false); // Set loading to false once data is fetched
          console.log('Spider Trak History', spiderTrakHistoryResponse.data);
      } catch (error) {
          console.log(error);
          setLoadingHistory(false); // Make sure to set loading to false even if an error occurs
      }
  };

    getSpiderTrakHistory();
    fetchData();
  }, []);

  useEffect(() => {
    const filteredResult = spideTrakData.filter(item =>
       item.unit_id.toLowerCase().includes(searchQuery.toLowerCase())  ||
       item.track_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.esn.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setFilteredData(filteredResult)
  },[searchQuery, spideTrakData])

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
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
            <StyledTableCell onClick={() => handleRowClick(index)} >
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
        <Box sx={{ width: "100%", overflow: "auto" }}>
            <h2 className="font-lato text-[1rem] font-bold py-4">History</h2>
            {loadingHistory ? (
                <div className="flex items-center font-lato text-[1rem]">
                    Please wait it takes a while to fetch data...<CircularProgress />
                </div>
            ) : (
                <React.Fragment>
                    {!spiderTrakHistory.some(historyItem => historyItem.unit_id === item.unit_id) ?  (
                        <div className="text-sm">No history to show</div>
                    ) : (
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
                                {spiderTrakHistory.filter(historyItem => item.unit_id === historyItem.unit_id).slice(0,10).map((historyItem, historyIndex) => (
                                    item.unit_id === historyItem.unit_id && (
                                        <TableRow key={historyIndex}>
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
                                    )
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </React.Fragment>
            )}
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
