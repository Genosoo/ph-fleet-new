import { MapContainer, TileLayer} from 'react-leaflet';
import { useRef } from 'react';
import {useDropzone} from 'react-dropzone'
import imageThumbnail from '../../../assets/incident/image-thumbnail.svg'
import videoThumbnail from '../../../assets/incident/video-thumbnail.svg'
import pdfThumbnail from '../../../assets/incident/pdf-thumbnail.svg'
import AddReport from './AddReport'

export default function AddIncident() {
  const mapRef = useRef(null);
    const initialZoom = 5;


    const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } = useDropzone({
      accept: 'image/*',
      // onDrop: (acceptedFiles) => handleFileChange(acceptedFiles, 'image')
    });
  
    
  return (
   <>
   <AddReport />
    <div className="addIncidentContainer">
        <div className="addIncidentWrapper1">
          <div className="addIncidentBox1">
            <span>
                <h4>Prepared By:</h4>
                <p className="text-[#8E8E8E] font-bold">USER001</p>
            </span>

            <span>
                <h4>Source Location</h4>
                <p>Dona Aurora, Quezon City, 1113 Metro Manila</p>
            </span>

            <span>
                <h4 className="font-bold">FM</h4>
                <input type="text" placeholder="Add text here..." />
            </span>

            <span>
              <h4 className="font-bold">TO</h4>
              <input type="text" placeholder="Add text here..." />
            </span>
          </div>

          <div className="addIncidentBox2">
            <h3>BT</h3>
            <span>
                <h4>Classification</h4>
                <div className="selectionBox">
                  <select>
                    <option value="">Select Classifiction</option>
                    <option value="secret">Secret</option>
                    <option value="top secret">Top Secret</option>
                    <option value="confidential">Confidential</option>
                    <option value="internal use only">Internal Use Only</option>
                    <option value="public">Public</option>
                  </select>
                </div>
            </span>

            <span>
                <h4>Citation</h4>
                <input type="text" placeholder="Add text here..." />
            </span>

            
            <span>
                <h4>Report Type</h4>
                <div className="selectionBox">
                  <select>
                    <option value="">Select Report Type</option>
                    <option value="">Spot Apprehension Report</option>
                    <option value="">Spot Intelligence Report</option>
                    <option value="">Unusual Incident Report</option>
                  </select>
                </div>
            </span>
          </div>

          <div className="addIncidentBox3">
            <h3>REF CLN</h3>
            <span>
                <h4>WHEN</h4>
                  <input type="date" />
            </span>

            <span>
                <h4>WHERE</h4>
                <input type="text" placeholder="Manual Input Address" />
                <input type="text" className="mt-3" placeholder="Input Location of Incident" />

                <div className="checkboxFlex">
                    <div className="checkboxBox">
                      <input type="checkbox" />
                        <h5>Use Current Location</h5>
                    </div>

                    <div className="checkboxBox">
                      <input type="checkbox" />
                        <h5>Select on Map</h5>
                    </div>

                </div>
            </span>

            <span>
                <h4>WHAT</h4>
                  <input type="text"  placeholder="Add text here..."  />
            </span>

            <span>
                <h4>WHO</h4>
                  <input type="text"   placeholder="Add text here..." />
            </span>

            <span>
                <h4>WHY</h4>
                  <input type="text"   placeholder="Add text here..." />
            </span>

            <span>
                <h4>HOW</h4>
                  <input type="text"   placeholder="Add text here..." />
            </span>

          </div>


          <div className="addIncidentBox4">
            <h3>Incident Description</h3>
            <textarea placeholder="Enter description..." />
          </div>
        </div>

        <div className="addIncidentWrapper2">
           <div className="addIncidentMap">
              <h3>Incident Location</h3>
              <div className="addIncidentMapBox">
                <MapContainer zoomControl={false}  ref={mapRef}  center={[12.8797, 121.774]}  zoom={initialZoom} style={{ height: '100%', width: '100%' }}>
                   <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                 </MapContainer>
              </div>
           </div>

           <div className="addIncidentBox5">
              <h3>Attachment</h3>
              <p>Upload up to 3 attachments with a maximum of 5MB file size each. <br />
              Valid attachments: PNG, JPG, TXT, MP4, MOV, PDF </p>
             
             <div className="addIncidentFileBox">
                <div className="addIncidentFileCard">
                        <h3>Upload Attachment 1</h3>
                        <div className="fileCard" {...getRootPropsImage()}>
                            <input {...getInputPropsImage()} />
                              <img src={imageThumbnail} alt="Uploaded" />
                          </div>
                </div>
                <textarea placeholder='Add description...'></textarea>
             </div>

             <div className="addIncidentFileBox">
                <div className="addIncidentFileCard">
                        <h3>Upload Attachment 2</h3>
                        <div className="fileCard" {...getRootPropsImage()}>
                            <input {...getInputPropsImage()} />
                              <img src={videoThumbnail} alt="Uploaded" />
                          </div>
                </div>
                <textarea placeholder='Add description...'></textarea>
             </div>

             <div className="addIncidentFileBox">
                <div className="addIncidentFileCard">
                        <h3>Upload Attachment 3</h3>
                        <div className="fileCard" {...getRootPropsImage()}>
                            <input {...getInputPropsImage()} />
                              <img src={pdfThumbnail} alt="Uploaded" />
                          </div>
                </div>
                <textarea placeholder='Add description...'></textarea>
             </div>
           
           </div>
        </div>
        
    </div>
    <footer className='addIncidentFooter'>
        <p>PROGRESS REPORT TO FOLLOW <br /> BT</p>
    </footer>
   </>
  )
}
