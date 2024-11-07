import React from 'react';

interface IconProps {
    name: string;
    isSelected: boolean;
}

const CourtIcon: React.FC<IconProps> = ({ name, isSelected }) => {
    return (
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <div
                style={{
                    width: '70px',
                    height: '40px',
                    backgroundColor: isSelected ? '#45a049' : '#4CAF50',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isSelected ? '3px solid #fff' : '2px solid #fff',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    boxShadow: isSelected ? '0 6px 12px rgba(0, 0, 0, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.2s',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        background: 'linear-gradient(white, white) 0% 0% / 2px 100%, linear-gradient(white, white) 0% 100% / 100% 2px',
                        backgroundPosition: '0 0, 0 0',
                        backgroundSize: '100% 100%',
                        borderRadius: '4px',
                        opacity: 0.5,
                    }}
                />
            </div>
            <div
                style={{
                    marginTop: '5px',
                    color: isSelected ? 'red' : '#000',
                    fontSize: '15px',
                }}
            >
                {name}
            </div>
        </div>
    );
};

export default CourtIcon;
