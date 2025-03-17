'use client';

import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface Registration {
    _id: string;
    name: string;
    targetName: string;
    txnNumber: string;
    mobileNumber: string;
}

export default function RegistrationTable() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    console.log('data====== start==', registrations);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await fetch(
                    'https://unique-seahorse-d6680d.netlify.app/api/check-admin',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`
                        }
                    }
                );
                const data = await response.json();
                setIsAdmin(data.isAdmin);
            } catch (error) {
                console.error('Error checking admin status:', error);
            }
        };

        const fetchRegistrations = async () => {
            try {
                const response = await fetch(
                    'https://unique-seahorse-d6680d.netlify.app/api/registrations'
                );
                const data = await response.json();
                setRegistrations(data);
            } catch (error) {
                toast.error('Error fetching registrations');
            }
        };

        checkAdmin();
        fetchRegistrations();
    }, []);

    const handleDelete = async (id: string) => {
        if (!isAdmin) return;

        try {
            const response = await fetch(
                `https://unique-seahorse-d6680d.netlify.app/api/registrations/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.ok) {
                setRegistrations(prev => prev.filter(reg => reg._id !== id));
                toast.success('Registration deleted successfully');
            } else {
                toast.error('Failed to delete registration');
            }
        } catch (error) {
            toast.error('Error deleting registration');
        }
    };

    const handleEdit = async (id: string) => {
        if (!isAdmin) return;
        // Implement edit functionality
        toast.info('Edit functionality to be implemented');
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Target Name</TableHead>
                        <TableHead>Transaction Number</TableHead>
                        <TableHead>Mobile Number</TableHead>
                        {isAdmin && <TableHead>Actions</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {registrations.map(registration => (
                        <TableRow key={registration._id}>
                            <TableCell>{registration.name}</TableCell>
                            <TableCell>{registration.targetName}</TableCell>
                            <TableCell>{registration.txnNumber}</TableCell>
                            <TableCell>{registration.mobileNumber}</TableCell>
                            {isAdmin && (
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() =>
                                                handleEdit(registration._id)
                                            }
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() =>
                                                handleDelete(registration._id)
                                            }
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
