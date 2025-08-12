import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CourseCard = ({ course, onEnroll, onEdit, onDelete, isEnrolled, isAdmin }) => {
  return (
    <Card className="mb-4 card-hover h-100">
      {course.image ? (
        <Card.Img variant="top" src={course.image} style={{ height: '200px', objectFit: 'cover' }} />
      ) : (
        <div className="bg-secondary" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="text-white">No Image</span>
        </div>
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{course.title}</Card.Title>
        <Card.Text className="flex-grow-1">
          {course.description?.substring(0, 100)}{course.description?.length > 100 ? '...' : ''}
        </Card.Text>
        {isAdmin ? (
          <div className="d-flex justify-content-between mt-auto">
            <Button variant="warning" onClick={() => onEdit(course)}>Edit</Button>
            <Button variant="danger" onClick={() => onDelete(course.id)}>Delete</Button>
          </div>
        ) : (
          <Button 
            variant={isEnrolled ? "success" : "primary"} 
            onClick={() => onEnroll(course.id)}
            disabled={isEnrolled}
            className="mt-auto"
          >
            {isEnrolled ? 'Enrolled' : 'Enroll Now'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default CourseCard;