using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player_Controller : MonoBehaviour
{
    public float moveSpeed = 5f;      // Speed for left and right movement
    public float jumpForce = 5f;     // Force applied for jumping

    private Rigidbody rb;            // Reference to the Rigidbody component

    void Start()
    {
        // Get the Rigidbody component attached to the GameObject
        rb = GetComponent<Rigidbody>();
    }

    void Update()
    {
        // Move left and right with A and D
        float horizontalInput = 0f;
        if (Input.GetKey(KeyCode.A))
        {
            horizontalInput = -1f; // Move left
        }
        else if (Input.GetKey(KeyCode.D))
        {
            horizontalInput = 1f; // Move right
        }

        // Apply horizontal movement
        Vector3 movement = new Vector3(horizontalInput * moveSpeed, rb.velocity.y, 0);
        rb.velocity = movement;

        // Jump up with W
        if (Input.GetKeyDown(KeyCode.W) && Mathf.Abs(rb.velocity.y) < 0.01f)
        {
            rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        }
    }
}
