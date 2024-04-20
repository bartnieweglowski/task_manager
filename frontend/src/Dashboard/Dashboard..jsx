import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TotalCards from './TotalCards';
import CardsByStatus from './CardsByStatus';
import WIP from './WIP';
import Throughput from './Throughput';
import CardsByPriority from './CardsByPriority';
import './Dashboard.css'
import { useEffect } from 'react';
import TodoCount from './ToDoCount';
import DoneCount from './DoneCount';
import LeadTimeChart from './LeadTimeChart';
import TaskAssigneesChart from './TaskAssigneesChart';
import TimeSpentOnTasksChart from './TimeSpentOnTasksChart';


const Dashboard = () => {
    useEffect(() => {
        const bootstrapCSS = document.createElement('link');
        bootstrapCSS.href = 'bootstrap/dist/css/bootstrap.min.css';
        bootstrapCSS.type = 'text/css';
        bootstrapCSS.rel = 'stylesheet';
        document.head.appendChild(bootstrapCSS);

        return () => document.head.removeChild(bootstrapCSS);
    }, []);
    return (
        <Container fluid className="dashboard">
            <Row className="justify-content-md-center">
            <Col xs lg="2">
                    <TodoCount/>
                </Col>
                <Col xs lg="2">
                    <WIP />
                </Col>
                <Col xs lg="2">
                    <DoneCount/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CardsByPriority />
                </Col>
                <Col>
                    <TaskAssigneesChart/>
                </Col>
                <Col>
                    <Throughput />
                </Col>
                <Col>
                    <TimeSpentOnTasksChart />
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
