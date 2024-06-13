import * as THREE from 'three';

export function createCamera() {
    const LEFT_MOUSE_BUTTON = 0;
    const MIDDLE_MOUSE_BUTTON = 1;
    const RIGHT_MOUSE_BUTTON = 2;  // Corrected to 2
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    let cameraRadius = 5;
    let cameraAzimuth = 0;
    let cameraElevation = 0;
    let isLeftMouseDown = false;
    let isRightMouseDown = false;
    let isMiddleMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (event) => {
        switch (event.button) {
            case LEFT_MOUSE_BUTTON:
                isLeftMouseDown = true;
                break;
            case MIDDLE_MOUSE_BUTTON:
                isMiddleMouseDown = true;
                break;
            case RIGHT_MOUSE_BUTTON:
                isRightMouseDown = true;
                break;
        }
    };

    const onMouseUp = (event) => {
        switch (event.button) {
            case LEFT_MOUSE_BUTTON:
                isLeftMouseDown = false;
                break;
            case MIDDLE_MOUSE_BUTTON:
                isMiddleMouseDown = false;
                break;
            case RIGHT_MOUSE_BUTTON:
                isRightMouseDown = false;
                break;
        }
    };

    const onMouseMove = (event) => {
        if (isLeftMouseDown || isRightMouseDown || isMiddleMouseDown) {
            cameraAzimuth += -((event.clientX - prevMouseX) * 0.5);
            cameraElevation += ((event.clientY - prevMouseY) * 0.5);
            cameraElevation = Math.min(90, Math.max(0, cameraElevation));
            updateCameraPosition();
        }

        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    };

    const updateCameraPosition = () => {
        const position = new THREE.Vector3(
            cameraRadius * Math.sin(cameraAzimuth * Math.PI / 180) * Math.cos(cameraElevation * Math.PI / 180),
            cameraRadius * Math.sin(cameraElevation * Math.PI / 180),
            cameraRadius * Math.cos(cameraAzimuth * Math.PI / 180) * Math.cos(cameraElevation * Math.PI / 180)
        );
        camera.position.copy(position);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    };

    updateCameraPosition();

    return {
        camera,
        onMouseDown,
        onMouseUp,
        onMouseMove
    };
}
